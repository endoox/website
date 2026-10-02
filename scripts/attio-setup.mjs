// One-time Attio setup for the booking page: creates the "Demo requests" list on People and the fields
// lib/attio.ts writes to. Safe to re-run; anything that already exists is left alone.
//
//   ATTIO_API_KEY=... node scripts/attio-setup.mjs     (or put the key in .env.local)

import { readFileSync } from "node:fs";

const LIST = "demo_requests";

const key = process.env.ATTIO_API_KEY || readEnvFile(".env.local").ATTIO_API_KEY;
if (!key) {
  console.error("Set ATTIO_API_KEY (or add it to .env.local) first.");
  process.exit(1);
}

const ATTRIBUTES = [
  { api_slug: "stage", title: "Stage", type: "status", description: "Where the lead is in booking.", statuses: ["Form submitted", "Booked", "Canceled"] },
  { api_slug: "interest", title: "Interested in", type: "select", description: "What they asked to see.", options: ["Demo", "Valuation", "Both"] },
  { api_slug: "agency", title: "Agency", type: "text", description: "Agency name as typed on the form." },
  { api_slug: "roster_size", title: "Roster size", type: "select", description: "Athletes the agency represents.", options: ["1–10", "11–25", "26–50", "51–100", "100+"] },
  { api_slug: "sports", title: "Sports", type: "text", description: "Sports they represent." },
  { api_slug: "heard_about", title: "Heard about us", type: "text", description: "How they heard about endo." },
  { api_slug: "submitted_at", title: "Form submitted at", type: "timestamp", description: "Last time they submitted the booking form." },
  { api_slug: "meeting_at", title: "Meeting at", type: "timestamp", description: "Booked meeting start (needs CALENDLY_TOKEN on the site)." },
  { api_slug: "calendly_event", title: "Calendly event", type: "text", description: "Calendly event URI for the booking." },
  { api_slug: "source_page", title: "Source page", type: "text", description: "Page they clicked the demo button on." },
  { api_slug: "landing_page", title: "Landing page", type: "text", description: "First page of their visit." },
  { api_slug: "referrer", title: "Referrer", type: "text", description: "Outside site that sent them." },
  { api_slug: "utm_source", title: "UTM source", type: "text", description: "utm_source of their visit." },
  { api_slug: "utm_medium", title: "UTM medium", type: "text", description: "utm_medium of their visit." },
  { api_slug: "utm_campaign", title: "UTM campaign", type: "text", description: "utm_campaign of their visit." },
];

async function attio(method, path, body) {
  const response = await fetch(`https://api.attio.com/v2${path}`, {
    method,
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: body && JSON.stringify(body),
  });
  const text = await response.text();
  return { ok: response.ok, status: response.status, json: text ? JSON.parse(text) : null };
}

const existingList = await attio("GET", `/lists/${LIST}`);
if (existingList.ok) {
  console.log(`List "${LIST}" already exists.`);
} else {
  const created = await attio("POST", "/lists", {
    data: { name: "Demo requests", api_slug: LIST, parent_object: "people", workspace_access: "full-access", workspace_member_access: [] },
  });
  if (!created.ok) fail("Creating the list", created);
  console.log(`Created list "Demo requests".`);
}

const existing = await attio("GET", `/lists/${LIST}/attributes?limit=100`);
if (!existing.ok) fail("Reading list fields", existing);
const have = new Set(existing.json.data.map((attribute) => attribute.api_slug));

for (const { statuses, options, ...attribute } of ATTRIBUTES) {
  if (!have.has(attribute.api_slug)) {
    const created = await attio("POST", `/lists/${LIST}/attributes`, {
      data: { ...attribute, is_required: false, is_unique: false, is_multiselect: false, config: {} },
    });
    if (!created.ok) fail(`Creating field "${attribute.title}"`, created);
    console.log(`Created field "${attribute.title}".`);
  }
  for (const title of statuses ?? []) {
    const added = await attio("POST", `/lists/${LIST}/attributes/${attribute.api_slug}/statuses`, { data: { title } });
    if (added.ok) console.log(`  added stage "${title}"`);
  }
  for (const title of options ?? []) {
    const added = await attio("POST", `/lists/${LIST}/attributes/${attribute.api_slug}/options`, { data: { title } });
    if (added.ok) console.log(`  added option "${title}"`);
  }
}
console.log("Attio is ready for booking leads.");

function fail(step, result) {
  console.error(`${step} failed (${result.status}):`, JSON.stringify(result.json));
  process.exit(1);
}

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
