# endo-lander

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

## Demo requests

Every "Book a demo" link goes to `/contact`. The form there saves the answers as a row in the **Endo demo leads** Google Sheet, then shows the Calendly calendar (`CALENDLY_DEMO_URL` in `lib/contact.ts`) with the visitor's name and email filled in. Each lead gets an ID that is passed to Calendly as `utm_content`, so the booking is matched back to its row:

1. Form submitted → `/api/contact` adds a row with status `form_submitted`.
2. Time booked → the page calls `/api/contact/booked` and the row becomes `booked`.
3. Calendly's webhook calls `/api/calendly-webhook` → the row gets the meeting time, or becomes `cancelled` / `rescheduled`. Bookings made directly on Calendly get a row of their own.

The sheet logic lives in `scripts/google-sheet-leads.gs`; `lib/leads-sheet.ts` is the only file to change when leads move to a CRM.

### One-time setup

1. **Sheet script.** In the sheet, open Extensions → Apps Script and replace the code with `scripts/google-sheet-leads.gs`. Under Project Settings → Script properties, add `SHARED_SECRET` with a long random value (for example from `openssl rand -hex 32`). Then Deploy → New deployment → Web app, execute as **Me**, access **Anyone**, and copy the web app URL. The secret is what keeps others out. After editing the script later, use Deploy → Manage deployments → edit → New version so the URL stays the same.
2. **Calendly webhook** (needs the Standard plan or higher). Create a personal access token in Calendly → Integrations & apps → API and webhooks, then run
   `CALENDLY_TOKEN=<token> node scripts/register-calendly-webhook.mjs https://<your-domain>/api/calendly-webhook`
   and copy the signing key it prints.
3. **Site secrets.** Add these to the Cloudflare Worker (dashboard → Workers → endo-lander → Settings → Variables and secrets, or `npx wrangler secret put <NAME>`):

   | Name | Value |
   |---|---|
   | `SHEETS_WEBHOOK_URL` | the Apps Script web app URL |
   | `SHEETS_WEBHOOK_SECRET` | the same value as the script's `SHARED_SECRET` |
   | `CALENDLY_WEBHOOK_SIGNING_KEY` | the signing key from step 2 |

For local development put the same three values in `.env.local` (git ignores it). Without them the form still shows the calendar, but nothing is saved.

Tests: `node --experimental-strip-types --test lib/*.test.mjs`
