"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";

// The logo strip scrolls one row's width per loop. Before showing it, start the loop part-way through
// (a negative animation delay) so the first logo sits centered on screen, whatever the viewport width.
// The strip stays hidden and paused (page.module.css) until then.
export function LogoTrack({ className, children }: { className: string; children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const row = track?.firstElementChild as HTMLElement | null;
    const first = row?.firstElementChild as HTMLElement | null;
    const viewport = track?.parentElement;
    if (!track || !row || !first || !viewport) return;

    let timer = 0;
    let tries = 0;
    const position = () => {
      // Reduced motion: the strip doesn't scroll, so there's nothing to position.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        viewport.dataset.ready = "true";
        return;
      }
      const duration = parseFloat(getComputedStyle(track).animationDuration);
      // Styles can land after hydration (notably in dev): wait until the strip is actually laid out.
      const laidOut = duration > 0 && first.offsetWidth > 0 && first.offsetWidth < viewport.offsetWidth;
      if (!laidOut && tries++ < 40) {
        timer = window.setTimeout(position, 50);
        return;
      }
      if (laidOut) {
        const viewportBox = viewport.getBoundingClientRect();
        const firstBox = first.getBoundingClientRect();
        // Measure from the strip's resting position, ignoring however far it has already scrolled, so
        // running this again (React's dev double-run, a re-mount) gives the same answer.
        const scrolled = new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;
        const toCenter = firstBox.left - scrolled + firstBox.width / 2 - (viewportBox.left + viewportBox.width / 2);
        const rowWidth = row.offsetWidth;
        const shift = ((toCenter % rowWidth) + rowWidth) % rowWidth;
        track.style.animationDelay = `${-(shift / rowWidth) * duration}s`;
      }
      viewport.dataset.ready = "true";
    };
    position();
    return () => window.clearTimeout(timer);
  }, []);

  return <div ref={trackRef} className={className}>{children}</div>;
}
