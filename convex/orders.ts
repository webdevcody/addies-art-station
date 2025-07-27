import { v } from "convex/values";
import { query, internalMutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createOrder = internalMutation({
  args: {
    userId: v.id("users"),
    stripeSessionId: v.string(),
    total: v.number(),
    items: v.array(v.object({
      productId: v.id("products"),
      title: v.string(),
      price: v.number(),
      quantity: v.number(),
    })),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("orders", {
      ...args,
      status: "pending",
    });
  },
});

export const fulfillOrder = internalMutation({
  args: { stripeSessionId: v.string() },
  handler: async (ctx, args) => {
    console.log("Fulfilling order for session:", args.stripeSessionId);
    
    const order = await ctx.db
      .query("orders")
      .withIndex("by_stripe_session", (q) => q.eq("stripeSessionId", args.stripeSessionId))
      .first();

    if (!order) {
      console.error("Order not found for session:", args.stripeSessionId);
      throw new Error("Order not found");
    }

    // Check if order is already completed to avoid double processing
    if (order.status === "completed") {
      console.log("Order already completed, skipping");
      return;
    }

    // Mark order as completed
    await ctx.db.patch(order._id, { status: "completed" });

    // Mark products as sold and verify they exist
    for (const item of order.items) {
      const product = await ctx.db.get(item.productId);
      if (product) {
        await ctx.db.patch(item.productId, { status: "sold" });
        console.log("Product marked as sold:", product.title);
      } else {
        console.error("Product not found:", item.productId);
      }
    }

    // Clear user's cart
    const cartItems = await ctx.db
      .query("cartItems")
      .withIndex("by_user", (q) => q.eq("userId", order.userId))
      .collect();

    await Promise.all(cartItems.map(item => ctx.db.delete(item._id)));
    console.log("Order fulfillment completed successfully");
  },
});

export const getOrders = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
  },
});

// Admin function to view all orders for debugging
export const getAllOrders = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    // Check if user is admin
    const adminUser = await ctx.db
      .query("adminUsers")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();
    
    if (!adminUser?.isAdmin) return [];

    return await ctx.db.query("orders").collect();
  },
});
