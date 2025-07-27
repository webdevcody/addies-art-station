import { v } from "convex/values";
import {
  mutation,
  query,
  internalAction,
  internalMutation,
  QueryCtx,
  MutationCtx,
} from "./_generated/server";
import {
  customMutation,
  customQuery,
  customCtx,
} from "convex-helpers/server/customFunctions";
import { getAuthUserId } from "@convex-dev/auth/server";
import { createAccount } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

/**
 * Custom mutation builder that automatically checks admin privileges
 * Throws an error if the user is not authenticated or not an admin
 */
export const adminMutation = customMutation(
  mutation,
  customCtx(async (ctx: MutationCtx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const adminUser = await ctx.db
      .query("adminUsers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!adminUser) {
      throw new Error("Not authorized - admin privileges required");
    }

    return {
      adminUserId: adminUser._id,
      userId,
    };
  })
);

/**
 * Custom query builder that automatically checks admin privileges
 * Throws an error if the user is not authenticated or not an admin
 */
export const adminQuery = customQuery(
  query,
  customCtx(async (ctx: QueryCtx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const adminUser = await ctx.db
      .query("adminUsers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!adminUser) {
      throw new Error("Not authorized - admin privileges required");
    }

    return {
      adminUserId: adminUser._id,
      userId,
    };
  })
);

export const isAdmin = query({
  args: {},
  returns: v.boolean(),
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;

    const adminUser = await ctx.db
      .query("adminUsers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    return adminUser ? true : false;
  },
});

export const createAdminUser = internalAction({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const { user } = await createAccount(ctx, {
      provider: "password",
      account: { id: args.email, secret: args.password },
      profile: {
        email: args.email,
        emailVerificationTime: Date.now(),
        isAnonymous: false,
      },
    });

    await ctx.runMutation(internal.admin.insertAdminUser, {
      userId: user._id,
    });
  },
});

export const insertAdminUser = internalMutation({
  args: { userId: v.id("users") },
  returns: v.id("adminUsers"),
  handler: async (ctx, args) => {
    return await ctx.db.insert("adminUsers", {
      userId: args.userId,
    });
  },
});
