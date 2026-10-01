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
