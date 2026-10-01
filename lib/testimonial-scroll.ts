// Keep the same visible position in the middle of three identical groups.
export function wrapTestimonialScroll(position: number, groupWidth: number) {
  if (groupWidth <= 0) return position;
  return groupWidth + ((position % groupWidth) + groupWidth) % groupWidth;
}
