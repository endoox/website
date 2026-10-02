"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { needsEdgeWrap, TESTIMONIAL_COPIES, TESTIMONIAL_HOME, wrapTestimonialScroll } from "@/lib/testimonial-scroll";
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
    let touches = 0;
    let settleTimer = 0;
    viewport.scrollLeft = groupWidth * TESTIMONIAL_HOME;

    const wrap = () => {
      const position = viewport.scrollLeft;
      if (position < groupWidth * TESTIMONIAL_HOME || position >= groupWidth * (TESTIMONIAL_HOME + 1)) {
        viewport.scrollLeft = wrapTestimonialScroll(position, groupWidth);
      }
    };
    // Moves we drive ourselves (wheel, drag, autoplay) wrap straight away.
    const move = (pixels: number) => {
      remainder += pixels;
      const whole = Math.trunc(remainder);
      remainder -= whole;
      viewport.scrollLeft += whole;
      wrap();
    };
    // Jumping scrollLeft mid-fling cancels or fights the browser's momentum, so native
    // scrolls wrap once they settle, unless they are about to run out of track.
    const settle = () => {
      window.clearTimeout(settleTimer);
      if (!touches) wrap();
    };
    const onNativeScroll = () => {
      if (needsEdgeWrap(viewport.scrollLeft, groupWidth, viewport.clientWidth)) wrap();
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 150);
    };
    const pause = () => { resumeAt = performance.now() + 5000; };
    const endDrag = (event: PointerEvent) => {
      interacting = false;
      dragX = null;
      delete viewport.dataset.dragging;
      if (event.pointerType === "touch") pause();
      else resumeAt = 0;
    };

    viewport.addEventListener("scroll", onNativeScroll, { signal, passive: true });
    viewport.addEventListener("scrollend", settle, { signal });
    viewport.addEventListener("touchstart", (event) => { touches = event.touches.length; }, { signal, passive: true });
    const endTouch = (event: TouchEvent) => {
      touches = event.touches.length;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(settle, 150);
    };
    viewport.addEventListener("touchend", endTouch, { signal, passive: true });
    viewport.addEventListener("touchcancel", endTouch, { signal, passive: true });
    // Apply trackpad and shift+wheel deltas directly instead of letting the browser
    // animate towards a target that the wrap jump would invalidate.
    viewport.addEventListener("wheel", (event) => {
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      const delta = horizontal ? event.deltaX : event.shiftKey ? event.deltaY : 0;
      if (!delta) return;
      event.preventDefault();
      move(delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientWidth : 1));
    }, { signal, passive: false });
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
      move(dragX - event.clientX);
      dragX = event.clientX;
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
        move(elapsed * groupWidth / 55000);
      }
      frame = requestAnimationFrame(advance);
    };
    frame = requestAnimationFrame(advance);

    return () => {
      controller.abort();
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
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
        {Array.from({ length: TESTIMONIAL_COPIES }, (_, copy) => (
          <div ref={copy === TESTIMONIAL_HOME ? groupRef : undefined} className={styles.testimonialGroup} aria-hidden={copy !== TESTIMONIAL_HOME || undefined} key={copy}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
