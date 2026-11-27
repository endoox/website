// Prints /partners/one-pager to public/resources/endo-one-pager.pdf with headless Chrome, for the hub's
// "Download one-pager" buttons. Run it with the dev server up whenever the one-pager's copy changes:
//
//   npm run dev                (in one terminal)
//   npm run partners:pdf       (in another; pass a different base URL as an argument if needed)
//
// The PDF is committed, since the deploy build has no Chrome to make it.

import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const OUT = join(ROOT, "public/resources/endo-one-pager.pdf");
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const url = `${base}/partners/one-pager`;

const CHROME = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((path) => path && existsSync(path));
if (!CHROME) {
  console.error("Couldn't find Chrome. Install it, or set CHROME_PATH to its executable.");
  process.exit(1);
}

const response = await fetch(url).catch(() => null);
if (!response?.ok) {
  console.error(`Couldn't load ${url}. Start the site with \`npm run dev\` first.`);
  process.exit(1);
}

execFileSync(CHROME, [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--run-all-compositor-stages-before-draw",
  // Time for the images to load before printing.
  "--virtual-time-budget=15000",
  `--print-to-pdf=${OUT}`,
  url,
], { stdio: "ignore" });

console.log(`Built public/resources/endo-one-pager.pdf (${Math.round(statSync(OUT).size / 1024)} KB) from ${url}`);
