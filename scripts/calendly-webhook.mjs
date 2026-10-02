// One-time: registers the site's Calendly webhook (bookings and cancellations → app/api/calendly) on the
// company Calendly organization. Needs a Calendly personal access token from an admin of that account.
//
//   node scripts/calendly-webhook.mjs https://www.endodeals.com
//
// Reads CALENDLY_TOKEN from the environment or .env.local. Creates CALENDLY_WEBHOOK_SIGNING_KEY in
// .env.local if it isn't there yet; the live site needs that same value as a Vercel environment variable.

import { appendFileSync, readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";

const site = (process.argv[2] ?? "").replace(/\/$/, "");
if (!/^https:\/\//.test(site)) {
  console.error("Pass the live site's address, e.g. node scripts/calendly-webhook.mjs https://www.endodeals.com");
  process.exit(1);
}

const env = readEnvFile(".env.local");
const token = process.env.CALENDLY_TOKEN || env.CALENDLY_TOKEN;
if (!token) {
  console.error("Set CALENDLY_TOKEN (or add it to .env.local) first.");
  process.exit(1);
}

let signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY || env.CALENDLY_WEBHOOK_SIGNING_KEY;
if (!signingKey) {
  signingKey = randomBytes(32).toString("hex");
  appendFileSync(".env.local", `\nCALENDLY_WEBHOOK_SIGNING_KEY=${signingKey}\n`);
  console.log("Saved a new CALENDLY_WEBHOOK_SIGNING_KEY to .env.local.");
}

async function calendly(method, path, body) {
  const response = await fetch(`https://api.calendly.com${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body && JSON.stringify(body),
  });
  const json = await response.json().catch(() => null);
  if (!response.ok) {
    console.error(`Calendly ${method} ${path} failed (${response.status}):`, JSON.stringify(json));
    process.exit(1);
  }
  return json;
}

const me = await calendly("GET", "/users/me");
const organization = me.resource.current_organization;
const url = `${site}/api/calendly`;

const existing = await calendly("GET", `/webhook_subscriptions?organization=${encodeURIComponent(organization)}&scope=organization&count=100`);
if (existing.collection.some((hook) => hook.callback_url === url && hook.state === "active")) {
  console.log(`A webhook for ${url} already exists. If its signing key differs from .env.local, delete it in Calendly and re-run.`);
  process.exit(0);
}

await calendly("POST", "/webhook_subscriptions", {
  url,
  events: ["invitee.created", "invitee.canceled"],
  organization,
  scope: "organization",
  signing_key: signingKey,
});
console.log(`Calendly will now send bookings and cancellations to ${url}.`);
console.log("Add the same CALENDLY_WEBHOOK_SIGNING_KEY to the Vercel project's environment variables, then redeploy.");

function readEnvFile(path) {
  try {
    return Object.fromEntries(
      readFileSync(path, "utf8").split("\n")
        .map((line) => line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?(.*?)"?\s*$/))
        .filter(Boolean)
        .map((match) => [match[1], match[2]]),
    );
  } catch {
    return {};
  }
}
