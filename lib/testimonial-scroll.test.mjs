// Run with: node --experimental-strip-types --test lib/testimonial-scroll.test.mjs
import assert from "node:assert/strict";
import test from "node:test";
import { wrapTestimonialScroll } from "./testimonial-scroll.ts";

test("manual scrolling and autoplay wrap without changing the visible card offset", () => {
  assert.equal(wrapTestimonialScroll(1120, 1000), 1120);
  assert.equal(wrapTestimonialScroll(990, 1000), 1990);
  assert.equal(wrapTestimonialScroll(2005, 1000), 1005);
  assert.equal(wrapTestimonialScroll(4320, 1000), 1320);
  assert.equal(wrapTestimonialScroll(-25, 1000), 1975);
  assert.equal(wrapTestimonialScroll(25, 0), 25);
});
