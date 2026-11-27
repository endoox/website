# endo partners

The partner hub at **endodeals.com/partners**: a code-gated page with everything a partner needs to talk about endo and introduce an agency. It's part of the main site's Next.js app, so it deploys with the site, uses the same domain and fonts, and needs no second project. It isn't linked from the main site, isn't in the sitemap, and tells search engines not to index it.

| What | Where |
| --- | --- |
| Copy, links, codes, intro template, FAQ, contacts | `content/partners.ts` |
| Logo files for the brand kit | `public/resources/` |
| Customer logos and testimonials (shared with the home page) | `lib/proof.ts` |
| Press links (shared with the press page) | `lib/press.ts` |
| Layout and styles | `app/partners/` |
| Brand kit zip builder | `scripts/build-partner-kit.mjs` |

## The gate is cosmetic

Partner codes ship in the page's code, so anyone who looks can find them. The gate makes the hub feel private, but it doesn't protect anything. Never put anything sensitive in the hub: no pricing, earnings, payouts or partner-specific deal data.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000/partners. `npm run dev` rebuilds the brand kit zip first.

## Add or remove partner codes

Edit `PARTNER_CODES` in `content/partners.ts`:

```ts
export const PARTNER_CODES = [
  { code: "endopartner", partnerName: "" },
  { code: "thomas-2026", partnerName: "Thomas" },
];
```

- Codes aren't case-sensitive.
- With a `partnerName`, the hub greets "Welcome, Thomas". Leave it blank for a shared code, and the greeting is "Welcome to endo partners".
- A partner's code is remembered in their browser, so they skip the gate next time. Removing a code signs them out on their next visit. There's also a "Sign out of the partner hub" link at the bottom of the page.

## Edit the copy

Everything on the page is in `content/partners.ts`, in the order it appears:

- **`DEMO_VIDEO_URL`**: the demo video. Paste any YouTube link (`youtube.com/watch?v=…`, `youtu.be/…` or a share link). Until it's set, the hub shows a "Demo video coming soon" frame. The YouTube player only loads when someone presses play.
- **`DRIVE_URL`**: your Google Drive folder. The "Open the Google Drive" buttons appear once it's set.
- **`ENTRY`** and **`HUB`**: the gate's headline and line, and the hub's intro.
- **`KEY_POINTS`**: the six cards.
- **`BRAND_COLOURS`**, **`LOGO_FILES`**: the brand kit.
- **`ONE_PAGER`**: the one-page summary. Its feature list reuses the key point titles.
- **`INTRO_STEPS`**, **`INTRO_TEMPLATE`**, **`INTRO_LOG_EMAIL`**: how to make an intro.
- **`PRESS_ORDER`**: the order of the press cards, by outlet name.
- **`FAQ`** and **`CONTACTS`**.

Customer logos and testimonials come from `lib/proof.ts`, and press from `lib/press.ts`, the same lists the main site uses. A change there shows up on both.

Rules for the hub: write endo in lowercase, only use wording and facts that are public on endodeals.com, and never add pricing. If pricing comes up, the answer is "Pricing depends on the agency's size and needs. Mike will walk them through it on the first call."

## Swap files

Put the new file in `public/resources/`, then point its `LOGO_FILES` entry at it in `content/partners.ts`. Set `width` and `height` to the image's pixel size, and `background` to the tile colour it should sit on. The "Download all" zip (`endo-brand-kit.zip`) is rebuilt from that list, plus a `colours.txt`, every time `npm run dev` or `npm run build` runs. It's built, not committed, so never edit it by hand.

## Deploy

The hub deploys with the main site: merge to `main` and it goes out with the next deploy. The build runs `scripts/build-partner-kit.mjs` first (the `prebuild` script in `package.json`), so the zip is always current.

The hub loads no tracking: the LinkedIn Insight Tag and the booking button that run on the rest of the site are switched off on `/partners`.
