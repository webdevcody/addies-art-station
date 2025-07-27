import { v } from "convex/values";
import { query, mutation, internalMutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const isAdmin = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;

    const adminUser = await ctx.db
      .query("adminUsers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    return adminUser?.isAdmin || false;
  },
});

export const createAdminUser = internalMutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  returns: v.object({
    userId: v.id("users"),
    adminId: v.id("adminUsers"),
  }),
  handler: async (ctx, args) => {
    // Check if user with this email already exists
    const existingAccount = await ctx.db
      .query("authAccounts")
      .filter((q) =>
        q.and(
          q.eq(q.field("provider"), "password"),
          q.eq(q.field("providerAccountId"), args.email)
        )
      )
      .first();

    if (existingAccount) {
      throw new Error(`User with email ${args.email} already exists`);
    }

    // Create user account
    const userId = await ctx.db.insert("users", {
      email: args.email,
      emailVerificationTime: Date.now(),
      isAnonymous: false,
    });

    // Create password credential for the user
    await ctx.db.insert("authAccounts", {
      userId: userId,
      provider: "password",
      providerAccountId: args.email,
      secret: args.password, // Note: In production, this should be properly hashed
    });

    // Add user to adminUsers table
    const adminId = await ctx.db.insert("adminUsers", {
      userId: userId,
      isAdmin: true,
    });

    return {
      userId,
      adminId,
    };
  },
});
