"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = "[data-scroll-reveal]";

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

    root.dataset.motionReady = "true";

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach(revealElement);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          revealElement(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.12,
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
