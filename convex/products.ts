import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: { status: v.optional(v.union(v.literal("available"), v.literal("sold"))) },
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
        imageUrl: product.imageId ? await ctx.storage.getUrl(product.imageId) : null,
        videoUrl: product.videoId ? await ctx.storage.getUrl(product.videoId) : null,
      }))
    );
  },
});

export const get = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    if (!product) return null;

    return {
      ...product,
      imageUrl: product.imageId ? await ctx.storage.getUrl(product.imageId) : null,
      videoUrl: product.videoId ? await ctx.storage.getUrl(product.videoId) : null,
    };
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    price: v.number(),
    imageId: v.optional(v.id("_storage")),
    videoId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Check if user is admin
    const adminUser = await ctx.db
      .query("adminUsers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
    
    if (!adminUser?.isAdmin) throw new Error("Not authorized");

    return await ctx.db.insert("products", {
      ...args,
      status: "available",
      createdBy: userId,
    });
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Check if user is admin
    const adminUser = await ctx.db
      .query("adminUsers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
    
    if (!adminUser?.isAdmin) throw new Error("Not authorized");

    return await ctx.storage.generateUploadUrl();
  },
});

export const markAsSold = mutation({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.productId, { status: "sold" });
  },
});

import { Id } from "./_generated/dataModel";

export const getMany = query({
  args: { ids: v.array(v.id("products")) },
  handler: async (ctx, args) => {
    const products = await Promise.all(
      args.ids.map(async (id: Id<"products">) => {
        const product = await ctx.db.get(id);
        if (!product) return null;
        return {
          ...product,
          imageUrl: product.imageId ? await ctx.storage.getUrl(product.imageId) : null,
          videoUrl: product.videoId ? await ctx.storage.getUrl(product.videoId) : null,
        };
      })
    );
    return products.filter(Boolean);
  },
});
