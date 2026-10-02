// Verifies the Calendly-Webhook-Signature header ("t=<unix seconds>,v1=<hex HMAC-SHA256 of `${t}.${body}`>").
// Calendly signs with the signing key we gave it when registering the webhook (scripts/register-calendly-webhook.mjs).

const TOLERANCE_SECONDS = 5 * 60;

export async function verifyCalendlySignature(header: string | null, body: string, signingKey: string, nowMs = Date.now()) {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((part) => part.trim().split("=", 2) as [string, string]));
  const timestamp = Number(parts.t);
  const signature = parts.v1;
  if (!Number.isFinite(timestamp) || !signature) return false;
  if (Math.abs(nowMs / 1000 - timestamp) > TOLERANCE_SECONDS) return false;

  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(signingKey), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(`${parts.t}.${body}`)));
  const expected = Array.from(mac, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return timingSafeEqual(expected, signature.toLowerCase());
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
