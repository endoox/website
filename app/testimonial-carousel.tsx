"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { releaseVelocity, TESTIMONIAL_COPIES, wrapTestimonialOffset } from "@/lib/testimonial-scroll";
import styles from "./page.module.css";

export function TestimonialCarousel({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const group = groupRef.current;
    if (!viewport || !track || !group) return;

    // The browser never scrolls this: on iOS a fast native fling outran painting and
    // blanked the cards. Every input moves one composited track, wrapped within a group.
    const controller = new AbortController();
    const { signal } = controller;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let groupWidth = group.offsetWidth;
    let offset = 0;
    let velocity = 0;
    let glide = 0;
    let hovered = false;
    let visible = false;
    let drag: { id: number; x: number; samples: { x: number; t: number }[] } | null = null;
    let resumeAt = 0;
    let previousTime = performance.now();
    let frame = 0;

    const move = (pixels: number) => {
      offset = wrapTestimonialOffset(offset + pixels, groupWidth);
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
    };
    const pause = () => { resumeAt = performance.now() + 5000; };

    viewport.addEventListener("pointerenter", (event) => { hovered = event.pointerType === "mouse"; }, { signal });
    viewport.addEventListener("pointerleave", (event) => {
      if (event.pointerType !== "mouse") return;
      hovered = false;
      resumeAt = 0;
    }, { signal });
    viewport.addEventListener("dragstart", (event) => event.preventDefault(), { signal });
    viewport.addEventListener("pointerdown", (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      if (event.pointerType === "mouse") event.preventDefault();
      velocity = 0;
      glide = 0;
      drag = { id: event.pointerId, x: event.clientX, samples: [{ x: event.clientX, t: event.timeStamp }] };
      viewport.dataset.dragging = "true";
      viewport.setPointerCapture(event.pointerId);
      pause();
    }, { signal });
    viewport.addEventListener("pointermove", (event) => {
      if (drag?.id !== event.pointerId) return;
      move(drag.x - event.clientX);
      drag.x = event.clientX;
      drag.samples.push({ x: event.clientX, t: event.timeStamp });
      if (drag.samples.length > 8) drag.samples.shift();
    }, { signal });
    const endDrag = (event: PointerEvent) => {
      if (drag?.id !== event.pointerId) return;
      // A vertical page scroll takes the touch over (pointercancel): no fling for that.
      if (event.type === "pointerup") velocity = releaseVelocity(drag.samples, event.timeStamp);
      drag = null;
      delete viewport.dataset.dragging;
      if (event.pointerType === "touch") pause();
      else resumeAt = 0;
    };
    viewport.addEventListener("pointerup", endDrag, { signal });
    viewport.addEventListener("pointercancel", endDrag, { signal });
    viewport.addEventListener("lostpointercapture", endDrag, { signal });
    // Trackpad swipes and shift+wheel; vertical wheel still scrolls the page.
    viewport.addEventListener("wheel", (event) => {
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const delta = horizontal ? event.deltaX : event.shiftKey ? event.deltaY : 0;
      if (!delta) return;
      event.preventDefault();
      velocity = 0;
      move(delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientWidth : 1));
      pause();
    }, { signal, passive: false });
    viewport.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const card = group.firstElementChild as HTMLElement | null;
      const step = (card?.offsetWidth ?? 320) + parseFloat(getComputedStyle(group).columnGap || "0");
      velocity = 0;
      glide += event.key === "ArrowRight" ? step : -step;
      pause();
    }, { signal });

    const resizeObserver = new ResizeObserver(() => {
      const nextWidth = group.offsetWidth;
      const position = groupWidth ? offset / groupWidth * nextWidth : 0;
      groupWidth = nextWidth;
      offset = 0;
      move(position);
    });
    resizeObserver.observe(group);
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibilityObserver.observe(viewport);

    const advance = (now: number) => {
      const elapsed = Math.min(now - previousTime, 50);
      previousTime = now;
      if (velocity) {
        move(velocity * elapsed);
        velocity *= Math.pow(0.95, elapsed / 16);
        if (Math.abs(velocity) < 0.02) velocity = 0;
      } else if (glide) {
        const step = Math.abs(glide) < 0.5 ? glide : glide * Math.min(1, elapsed / 80);
        glide -= step;
        move(step);
      } else if (visible && !drag && !document.hidden && !reducedMotion.matches && !hovered && !viewport.matches(":focus-visible") && now >= resumeAt) {
        move(elapsed * groupWidth / 55000);
      }
      frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);

    return () => {
      controller.abort();
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      className={`${styles.testimonialViewport} ${styles.scrollReveal}`}
      data-scroll-reveal
      role="region"
      aria-label="Agency testimonials"
      aria-description="Use the left and right arrow keys to browse testimonials."
      tabIndex={0}
    >
      <div ref={trackRef} className={styles.testimonialTrack}>
        {Array.from({ length: TESTIMONIAL_COPIES }, (_, copy) => (
          <div ref={copy === 0 ? groupRef : undefined} className={styles.testimonialGroup} aria-hidden={copy !== 0 || undefined} key={copy}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
