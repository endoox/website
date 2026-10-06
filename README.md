# endo-website

Marketing site for Endo, built with Next.js and deployed to Cloudflare Workers via OpenNext.

## Getting started

Install dependencies, then start the dev server:

```sh
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` - local dev server with hot reload.
- `npm run build && npm start` - production build served locally with Node.
- `npm run preview` - build for Cloudflare and run it locally in the Workers runtime.
- `npm run deploy` - build and deploy to Cloudflare. Run `npx wrangler login` first.
- `npm run lint` - run ESLint.

## Demo bookings

Every "Request a demo" button goes to `/book`: an endo-branded form, then the Calendly calendar inline with the visitor's details prefilled. Leads land in Attio's **Demo requests** list (on People), with their answers, the page they came from and any `utm_*` tags. Calendly's webhook moves each entry to **Booked** (with the meeting time) or **Canceled**.

- `lib/contact.ts` holds the Calendly link. Use a direct event-type link, not a routing form, or visitors are asked for their details twice.
- Secrets (`.env.local` for local dev; `npx wrangler secret put NAME` for the live site):
  - `ATTIO_API_KEY`: Attio access token with read/write on records, lists and list entries, and list configuration.
  - `CALENDLY_WEBHOOK_SIGNING_KEY`: created by the webhook script below.
- One-time setup:
  - `node scripts/attio-setup.mjs` creates the Attio list and its fields.
  - `node scripts/calendly-webhook.mjs https://<live site>` registers the webhook (needs `CALENDLY_TOKEN`, a personal access token from an admin of the company Calendly account).

## Web analytics

Cloudflare Web Analytics runs on the `endodeals.com` zone with automatic setup: Cloudflare injects the beacon at the edge, so there is nothing to configure in the code. View it under Web Analytics in the Cloudflare dashboard.
