import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { adminMutation } from "./admin";

export const list = query({
  args: {
    status: v.optional(v.union(v.literal("available"), v.literal("sold"))),
  },
  returns: v.array(
    v.object({
      _id: v.id("products"),
      _creationTime: v.number(),
      title: v.string(),
      description: v.string(),
      price: v.number(),
      status: v.union(v.literal("available"), v.literal("sold")),
      createdBy: v.id("users"),
      imageId: v.optional(v.id("_storage")),
      videoId: v.optional(v.id("_storage")),
      imageUrl: v.union(v.string(), v.null()),
      videoUrl: v.union(v.string(), v.null()),
    })
  ),
  handler: async (ctx, args) => {
    const products = await ctx.db
      .query("products")
      .withIndex("by_status", (q) =>
        args.status ? q.eq("status", args.status) : q
      )
      .collect();

    return Promise.all(
      products.map(async (product) => ({
        ...product,
        imageUrl: product.imageId
          ? await ctx.storage.getUrl(product.imageId)
          : null,
        videoUrl: product.videoId
          ? await ctx.storage.getUrl(product.videoId)
          : null,
      }))
    );
  },
});

export const get = query({
  args: { id: v.id("products") },
  returns: v.union(
    v.object({
      _id: v.id("products"),
      _creationTime: v.number(),
      title: v.string(),
      description: v.string(),
      price: v.number(),
      status: v.union(v.literal("available"), v.literal("sold")),
      createdBy: v.id("users"),
      imageId: v.optional(v.id("_storage")),
      videoId: v.optional(v.id("_storage")),
      imageUrl: v.union(v.string(), v.null()),
      videoUrl: v.union(v.string(), v.null()),
    }),
    v.null()
  ),
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    if (!product) return null;

    return {
      ...product,
      imageUrl: product.imageId
        ? await ctx.storage.getUrl(product.imageId)
        : null,
      videoUrl: product.videoId
        ? await ctx.storage.getUrl(product.videoId)
        : null,
    };
  },
});

export const create = adminMutation({
  args: {
    title: v.string(),
    description: v.string(),
    price: v.number(),
    imageId: v.optional(v.id("_storage")),
    videoId: v.optional(v.id("_storage")),
  },
  returns: v.id("products"),
  handler: async (ctx, args) => {
    // No need for manual auth checks - adminMutation handles this automatically
    // ctx.userId and ctx.adminUserId are now available from the custom context
    return await ctx.db.insert("products", {
      ...args,
      status: "available",
      createdBy: ctx.userId,
    });
  },
});

export const generateUploadUrl = adminMutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    // No need for manual auth checks - adminMutation handles this automatically
    return await ctx.storage.generateUploadUrl();
  },
});

export const update = adminMutation({
  args: {
    productId: v.id("products"),
    title: v.string(),
    description: v.string(),
    price: v.number(),
    imageId: v.optional(v.id("_storage")),
    videoId: v.optional(v.id("_storage")),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const { productId, ...updateData } = args;
    await ctx.db.patch(productId, updateData);
    return null;
  },
});

export const markAsSold = mutation({
  args: { productId: v.id("products") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.productId, { status: "sold" });
    return null;
  },
});

import { Id } from "./_generated/dataModel";

export const getMany = query({
  args: { ids: v.array(v.id("products")) },
  returns: v.array(
    v.union(
      v.object({
        _id: v.id("products"),
        _creationTime: v.number(),
        title: v.string(),
        description: v.string(),
        price: v.number(),
        status: v.union(v.literal("available"), v.literal("sold")),
        createdBy: v.id("users"),
        imageId: v.optional(v.id("_storage")),
        videoId: v.optional(v.id("_storage")),
        imageUrl: v.union(v.string(), v.null()),
        videoUrl: v.union(v.string(), v.null()),
      }),
      v.null()
    )
  ),
  handler: async (ctx, args) => {
    const products = await Promise.all(
      args.ids.map(async (id: Id<"products">) => {
        const product = await ctx.db.get(id);
        if (!product) return null;
        return {
          ...product,
          imageUrl: product.imageId
            ? await ctx.storage.getUrl(product.imageId)
            : null,
          videoUrl: product.videoId
            ? await ctx.storage.getUrl(product.videoId)
            : null,
        };
      })
    );
    return products.filter(Boolean);
  },
});
