"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-scroll-reveal]";
const DRIFT_SELECTOR = "[data-scroll-drift]";

function revealElement(element: HTMLElement) {
  element.dataset.visible = "true";

  if (element.classList.contains("t-stagger")) {
    element.classList.remove("is-hiding");
    element.classList.add("is-shown");
  }
}

export function MotionObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    );
    const driftElements = Array.from(
      document.querySelectorAll<HTMLElement>(DRIFT_SELECTOR),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    elements.forEach((element) => {
      const bounds = element.getBoundingClientRect();

      if (bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0) {
        revealElement(element);
      }
    });

    root.dataset.motionReady = "true";
    let animationFrame = 0;
    let observer: IntersectionObserver | null = null;

    const updateDrift = () => {
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;

      driftElements.forEach((element) => {
        const bounds = element.getBoundingClientRect();

        if (bounds.bottom < -120 || bounds.top > viewportHeight + 120) {
          return;
        }

        const strength = Number(element.dataset.scrollDrift ?? 14);
        const elementCenter = bounds.top + bounds.height / 2;
        const progress = Math.max(
          -1,
          Math.min(1, (viewportCenter - elementCenter) / viewportHeight),
        );

        element.style.setProperty(
          "--scroll-drift",
          `${(progress * strength).toFixed(2)}px`,
        );
      });

      animationFrame = 0;
    };

    const scheduleDrift = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateDrift);
      }
    };

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach(revealElement);
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            revealElement(entry.target as HTMLElement);
            observer?.unobserve(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -8% 0px",
          threshold: 0.12,
        },
      );

      elements.forEach((element) => observer?.observe(element));
      updateDrift();
      window.addEventListener("scroll", scheduleDrift, { passive: true });
      window.addEventListener("resize", scheduleDrift);
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", scheduleDrift);
      window.removeEventListener("resize", scheduleDrift);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return null;
}
