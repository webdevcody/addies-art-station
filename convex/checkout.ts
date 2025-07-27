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
  args: { siteUrl: v.optional(v.string()) },
  handler: async (ctx, args): Promise<{ url: string | null }> => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Cart is now handled in the frontend. This logic is deprecated.
    // const cartItems = await ctx.runQuery(api.cart.list);
    // if (cartItems.length === 0) throw new Error("Cart is empty");

    // const lineItems = cartItems.map((item: any) => ({
    //   price_data: {
    //     currency: "usd",
    //     product_data: {
    //       name: item.product.title,
    //       description: item.product.description,
    //       images: item.product.imageUrl ? [item.product.imageUrl] : [],
    //     },
    //     unit_amount: item.product.price,
    //   },
    //   quantity: item.quantity,
    // }));

    // You may want to implement a new checkout flow that receives cart data from the client.
    // Example placeholder session for development. Replace with real logic.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [], // TODO: Pass cart data from client
      mode: "payment",
      success_url: `${args.siteUrl || process.env.SITE_URL || 'https://optimistic-frog-222.convex.site'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${args.siteUrl || process.env.SITE_URL || 'https://optimistic-frog-222.convex.site'}/cart`,
      metadata: {
        userId,
      },
    });

    // TODO: Create order record with cart data from client
    // const total = ...;
    // await ctx.runMutation(internal.orders.createOrder, { ... });

    return { url: session.url };
  },
});
