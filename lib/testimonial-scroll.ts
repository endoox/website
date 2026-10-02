// Identical groups rendered side by side; the first is the real one, the rest fill the loop.
export const TESTIMONIAL_COPIES = 3;

// Track offset inside one group, so every position shows the same cards.
export function wrapTestimonialOffset(offset: number, groupWidth: number) {
  if (groupWidth <= 0) return offset;
  return ((offset % groupWidth) + groupWidth) % groupWidth;
}

// Fling speed in px/ms from recent drag samples, capped so a flick can't outrun the eye.
export function releaseVelocity(samples: { x: number; t: number }[], now: number, max = 4) {
  const recent = samples.filter((sample) => now - sample.t <= 100);
  if (recent.length < 2) return 0;
  const first = recent[0];
  const last = recent[recent.length - 1];
  if (now - last.t > 50 || last.t === first.t) return 0;
  const velocity = (first.x - last.x) / (last.t - first.t);
  return Math.max(-max, Math.min(max, velocity));
}
