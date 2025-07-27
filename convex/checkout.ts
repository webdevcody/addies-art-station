"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { api, internal } from "./_generated/api";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export const createCheckoutSession = action({
  args: {
    siteUrl: v.optional(v.string()),
    cartItems: v.array(
      v.object({
        productId: v.id("products"),
        quantity: v.number(),
      })
    ),
  },
  returns: v.object({ url: v.union(v.string(), v.null()) }),
  handler: async (ctx, args): Promise<{ url: string | null }> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    if (args.cartItems.length === 0) throw new Error("Cart is empty");

    // Get product details for all cart items
    const productIds = args.cartItems.map((item) => item.productId);
    const products = await ctx.runQuery(api.products.getMany, {
      ids: productIds,
    });

    // Create line items for Stripe
    const lineItems = [];
    const orderItems = [];
    let total = 0;

    for (const cartItem of args.cartItems) {
      const product = products.find((p) => p && p._id === cartItem.productId);
      if (!product) {
        throw new Error(`Product not found: ${cartItem.productId}`);
      }

      const lineItem = {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            description: product.description,
            images: product.imageUrl ? [product.imageUrl] : [],
          },
          unit_amount: product.price, // Price is already in cents
        },
        quantity: cartItem.quantity,
      };

      lineItems.push(lineItem);

      orderItems.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: cartItem.quantity,
      });

      total += product.price * cartItem.quantity;
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${args.siteUrl || process.env.SITE_URL || "https://optimistic-frog-222.convex.site"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${args.siteUrl || process.env.SITE_URL || "https://optimistic-frog-222.convex.site"}/cart`,
      metadata: {
        userId,
      },
    });

    // Create order record
    await ctx.runMutation(internal.orders.createOrder, {
      userId,
      stripeSessionId: session.id,
      total,
      items: orderItems,
    });

    return { url: session.url };
  },
});
