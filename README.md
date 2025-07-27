# Addie's Art Station

A modern art marketplace built with React, Convex, and Stripe.

## Features

- Browse and view artwork
- Shopping cart functionality
- Admin portal for managing artwork
- Stripe integration for payments

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Start the development server:
```bash
npm run dev
```

## Admin Setup

To create an admin user, you can use the Convex dashboard to call the internal mutation:

```javascript
// In the Convex dashboard, run this internal mutation:
internal.admin.createAdminUser({
  email: "admin@example.com",
  password: "your-secure-password"
})
```

This will create a user account and automatically add them to the admin users table.

## Environment Variables

- `CONVEX_DEPLOYMENT` - Your Convex deployment
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key (server-side only)

## Deployment

Deploy to your preferred hosting platform. Make sure to set the environment variables in your deployment environment.
