// Run with: node --experimental-strip-types --test lib/testimonial-scroll.test.mjs
import assert from "node:assert/strict";
import test from "node:test";
import { needsEdgeWrap, wrapTestimonialScroll } from "./testimonial-scroll.ts";

test("manual scrolling and autoplay wrap without changing the visible card offset", () => {
  assert.equal(wrapTestimonialScroll(2120, 1000), 2120);
  assert.equal(wrapTestimonialScroll(1990, 1000), 2990);
  assert.equal(wrapTestimonialScroll(3005, 1000), 2005);
  assert.equal(wrapTestimonialScroll(4320, 1000), 2320);
  assert.equal(wrapTestimonialScroll(-25, 1000), 2975);
  assert.equal(wrapTestimonialScroll(25, 0), 25);
});

test("native scrolling only wraps near either end of the track", () => {
  assert.equal(needsEdgeWrap(2500, 1000, 800), false);
  assert.equal(needsEdgeWrap(1200, 1000, 800), false);
  assert.equal(needsEdgeWrap(3100, 1000, 800), false);
  assert.equal(needsEdgeWrap(900, 1000, 800), true);
  assert.equal(needsEdgeWrap(3300, 1000, 800), true);
});
