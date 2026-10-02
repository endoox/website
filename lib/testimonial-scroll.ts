// Identical groups rendered side by side; the middle one is "home".
export const TESTIMONIAL_COPIES = 5;
export const TESTIMONIAL_HOME = Math.floor(TESTIMONIAL_COPIES / 2);

// Keep the same visible position, moved into the home group.
export function wrapTestimonialScroll(position: number, groupWidth: number) {
  if (groupWidth <= 0) return position;
  return groupWidth * TESTIMONIAL_HOME + ((position % groupWidth) + groupWidth) % groupWidth;
}

// Native scrolling (touch momentum, arrow-key animation) is left alone while it runs:
// only wrap mid-scroll when it gets within a group of either end.
export function needsEdgeWrap(position: number, groupWidth: number, viewportWidth: number) {
  return position < groupWidth || position > groupWidth * (TESTIMONIAL_COPIES - 1) - viewportWidth;
}
