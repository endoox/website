// Run with: node --experimental-strip-types --test lib/testimonial-scroll.test.mjs
import assert from "node:assert/strict";
import test from "node:test";
import { releaseVelocity, wrapTestimonialOffset } from "./testimonial-scroll.ts";

test("offsets wrap into one group without changing the visible card offset", () => {
  assert.equal(wrapTestimonialOffset(120, 1000), 120);
  assert.equal(wrapTestimonialOffset(1005, 1000), 5);
  assert.equal(wrapTestimonialOffset(4320, 1000), 320);
  assert.equal(wrapTestimonialOffset(-25, 1000), 975);
  assert.equal(wrapTestimonialOffset(25, 0), 25);
});

test("release velocity follows the last 100ms of the drag", () => {
  const samples = [{ x: 500, t: 0 }, { x: 400, t: 150 }, { x: 300, t: 200 }, { x: 200, t: 250 }];
  assert.equal(releaseVelocity(samples, 250), 2);
  assert.equal(releaseVelocity([{ x: 300, t: 0 }, { x: 400, t: 50 }], 50), -2);
});

test("release velocity is capped and drops to zero after a pause", () => {
  assert.equal(releaseVelocity([{ x: 1000, t: 0 }, { x: 0, t: 50 }], 50), 4);
  assert.equal(releaseVelocity([{ x: 300, t: 0 }, { x: 200, t: 50 }], 200), 0);
  assert.equal(releaseVelocity([{ x: 300, t: 0 }], 0), 0);
});
