"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { wrapTestimonialScroll } from "@/lib/testimonial-scroll";
import styles from "./page.module.css";

export function TestimonialCarousel({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;

    const controller = new AbortController();
    const { signal } = controller;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let groupWidth = group.offsetWidth;
    let hovered = false;
    let interacting = false;
    let visible = false;
    let dragX: number | null = null;
    let resumeAt = 0;
    let previousTime = performance.now();
    let remainder = 0;
    let frame = 0;
    viewport.scrollLeft = groupWidth;

    const wrap = () => {
      if (viewport.scrollLeft < groupWidth || viewport.scrollLeft >= groupWidth * 2) {
        viewport.scrollLeft = wrapTestimonialScroll(viewport.scrollLeft, groupWidth);
      }
    };
    const pause = () => { resumeAt = performance.now() + 5000; };
    const endDrag = (event: PointerEvent) => {
      interacting = false;
      dragX = null;
      delete viewport.dataset.dragging;
      if (event.pointerType === "touch") pause();
      else resumeAt = 0;
    };

    viewport.addEventListener("scroll", wrap, { signal, passive: true });
    viewport.addEventListener("pointerenter", (event) => { hovered = event.pointerType === "mouse"; }, { signal });
    viewport.addEventListener("pointerleave", (event) => {
      if (event.pointerType !== "mouse") return;
      hovered = false;
      resumeAt = 0;
    }, { signal });
    viewport.addEventListener("dragstart", (event) => event.preventDefault(), { signal });
    viewport.addEventListener("pointerdown", (event) => {
      if (!event.isPrimary || event.button !== 0) return;
      interacting = true;
      if (event.pointerType === "touch") pause();
      else resumeAt = 0;
      if (event.pointerType !== "mouse") return;
      event.preventDefault();
      dragX = event.clientX;
      viewport.dataset.dragging = "true";
      viewport.setPointerCapture(event.pointerId);
    }, { signal });
    viewport.addEventListener("pointermove", (event) => {
      if (dragX === null) return;
      viewport.scrollLeft += dragX - event.clientX;
      dragX = event.clientX;
      wrap();
    }, { signal });
    viewport.addEventListener("pointerup", endDrag, { signal });
    viewport.addEventListener("pointercancel", endDrag, { signal });
    viewport.addEventListener("lostpointercapture", endDrag, { signal });

    const resizeObserver = new ResizeObserver(() => {
      const nextWidth = group.offsetWidth;
      const position = groupWidth ? viewport.scrollLeft / groupWidth * nextWidth : nextWidth;
      groupWidth = nextWidth;
      viewport.scrollLeft = wrapTestimonialScroll(position, groupWidth);
    });
    resizeObserver.observe(group);
    const visibilityObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    visibilityObserver.observe(viewport);

    const advance = (now: number) => {
      const elapsed = Math.min(now - previousTime, 50);
      previousTime = now;
      if (visible && !document.hidden && !reducedMotion.matches && !hovered && !viewport.matches(":focus-visible") && !interacting && now >= resumeAt) {
        remainder += elapsed * groupWidth / 55000;
        const pixels = Math.floor(remainder);
        remainder -= pixels;
        viewport.scrollLeft += pixels;
        wrap();
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
      <div className={styles.testimonialTrack}>
        {[0, 1, 2].map((copy) => (
          <div ref={copy === 1 ? groupRef : undefined} className={styles.testimonialGroup} aria-hidden={copy !== 1 || undefined} key={copy}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
