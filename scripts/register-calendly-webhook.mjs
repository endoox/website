// Registers the Calendly webhook that tells the site about demo bookings and cancellations. Run once:
//
//   CALENDLY_TOKEN=<personal access token> node scripts/register-calendly-webhook.mjs https://<your-domain>/api/calendly-webhook
//
// Create the token in Calendly → Integrations & apps → API and webhooks. The script prints a signing key;
// save it as the site's CALENDLY_WEBHOOK_SIGNING_KEY secret. It only talks to Calendly; it deploys nothing.
import { randomBytes } from "node:crypto";

const token = process.env.CALENDLY_TOKEN;
const url = process.argv[2];
if (!token || !url?.startsWith("https://")) {
  console.error("Usage: CALENDLY_TOKEN=... node scripts/register-calendly-webhook.mjs https://<your-domain>/api/calendly-webhook");
  process.exit(1);
}

async function calendly(path, init = {}) {
  const response = await fetch(`https://api.calendly.com${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`${init.method ?? "GET"} ${path} failed (${response.status}): ${JSON.stringify(body)}`);
  return body;
}

const { resource: me } = await calendly("/users/me");
const signingKey = randomBytes(32).toString("hex");
const { resource: webhook } = await calendly("/webhook_subscriptions", {
  method: "POST",
  body: JSON.stringify({
    url,
    events: ["invitee.created", "invitee.canceled"],
    organization: me.current_organization,
    user: me.uri,
    scope: "user",
    signing_key: signingKey,
  }),
});

console.log(`Webhook created: ${webhook.uri}`);
console.log(`Bookings for ${me.email} will be sent to ${url}`);
console.log("\nSave this as the CALENDLY_WEBHOOK_SIGNING_KEY secret (it is not shown again):\n");
console.log(signingKey);
