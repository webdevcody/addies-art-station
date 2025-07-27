"use node";

import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import Stripe from "stripe";

const http = httpRouter();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

http.route({
  path: "/stripe-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      return new Response("No signature", { status: 400 });
    }

    const body = await request.text();
    
    try {
      // Verify the webhook signature for security
      let event;
      if (process.env.STRIPE_WEBHOOK_SECRET) {
        event = await stripe.webhooks.constructEventAsync(
          body,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } else {
        console.warn("⚠️ WEBHOOK SECRET NOT SET - USING UNSAFE FALLBACK FOR TESTING");
        event = JSON.parse(body);
      }

      console.log("Webhook event received:", event.type);

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Processing completed checkout session:", session.id);
        
        await ctx.runMutation(internal.orders.fulfillOrder, {
          stripeSessionId: session.id,
        });
      }

      return new Response("OK", { status: 200 });
    } catch (error) {
      console.error("Webhook signature verification failed:", error);
      return new Response("Webhook signature verification failed", { status: 400 });
    }
  }),
});

export default http;
