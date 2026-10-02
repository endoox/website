// Run with: node --experimental-strip-types --test lib/demo-request.test.mjs
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { verifyCalendlySignature } from "./calendly-signature.ts";
import { parseDemoRequest } from "./demo-request.ts";

const valid = {
  name: "  Sam Agent ",
  email: "Sam@Agency.com",
  role: "Agent / Talent marketer",
  athletes: "51–150",
  helpWith: "Valuing endorsement deals",
  sports: "Hockey",
};

test("a complete request is trimmed and the email lowercased", () => {
  assert.deepEqual(parseDemoRequest(valid), { request: { ...valid, name: "Sam Agent", email: "sam@agency.com" } });
});

test("athletes is optional", () => {
  assert.equal(parseDemoRequest({ ...valid, athletes: "" }).request.athletes, "");
});

test("missing fields and unlisted options are reported", () => {
  assert.deepEqual(parseDemoRequest({ ...valid, name: " ", email: "nope", role: "CEO", athletes: "26–50", helpWith: undefined, sports: "" }), {
    errors: ["name", "email", "role", "athletes", "helpWith", "sports"],
  });
  assert.deepEqual(parseDemoRequest(null).errors, ["name", "email", "role", "helpWith", "sports"]);
});

test("Calendly signatures are checked against the key, body and time", async () => {
  const key = "signing-key";
  const body = '{"event":"invitee.created"}';
  const now = 1_790_000_000_000;
  const t = now / 1000;
  const sign = (k, b, time = t) => `t=${time},v1=${createHmac("sha256", k).update(`${time}.${b}`).digest("hex")}`;

  assert.equal(await verifyCalendlySignature(sign(key, body), body, key, now), true);
  assert.equal(await verifyCalendlySignature(sign("wrong", body), body, key, now), false);
  assert.equal(await verifyCalendlySignature(sign(key, body), `${body} `, key, now), false);
  assert.equal(await verifyCalendlySignature(sign(key, body, t - 600), body, key, now), false);
  assert.equal(await verifyCalendlySignature(null, body, key, now), false);
  assert.equal(await verifyCalendlySignature("garbage", body, key, now), false);
});
