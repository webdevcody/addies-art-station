import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  products: defineTable({
    title: v.string(),
    description: v.string(),
    price: v.number(), // in cents
    imageId: v.optional(v.id("_storage")),
    videoId: v.optional(v.id("_storage")),
    status: v.union(v.literal("available"), v.literal("sold")),
    createdBy: v.id("users"),
  }).index("by_status", ["status"]),

  cartItems: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    quantity: v.number(),
  }).index("by_user", ["userId"]),

  orders: defineTable({
    userId: v.id("users"),
    stripeSessionId: v.string(),
    status: v.union(
      v.literal("pending"),
      v.literal("toShip"),
      v.literal("completed")
    ),
    total: v.number(), // in cents
    items: v.array(
      v.object({
        productId: v.id("products"),
        title: v.string(),
        price: v.number(),
        quantity: v.number(),
      })
    ),
  })
    .index("by_stripe_session", ["stripeSessionId"])
    .index("by_status", ["status"]),

  adminUsers: defineTable({
    userId: v.id("users"),
  }).index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
