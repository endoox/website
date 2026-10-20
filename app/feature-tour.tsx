"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./page.module.css";

// Wide screens: the heading, pills and current story pin together as one screen-filling frame, and
// scrolling steps through the stories one at a time (see .featureTour in page.module.css). Narrow screens:
// the stories stack; short desktop windows keep a pinned pill bar that follows along, and phones hide it.
// Wherever the pills show, they highlight the story in view, and clicking one goes there.
const TOUR_QUERY = "(min-width: 761px) and (min-height: 621px)";

export function FeatureTour({ heading, features, children }: { heading: ReactNode; features: readonly { id: string; label: string }[]; children: ReactNode }) {
  const [active, setActive] = useState(0);
  const tourRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLElement>(null);
  // While a pill click is scrolling the page, hold the highlight on its target instead of stepping
  // through every story on the way.
  const heldRef = useRef(false);

  // Which story is current, from the scroll position.
  useEffect(() => {
    const tour = tourRef.current;
    const pills = pillsRef.current;
    if (!tour || !pills) return;
    const stories = Array.from(tour.querySelectorAll<HTMLElement>("[data-feature-story]"));
    const touring = window.matchMedia(TOUR_QUERY);
    let frame = 0;

    const update = () => {
      frame = 0;
      if (heldRef.current) return;
      let index = 0;
      if (touring.matches) {
        const { stageTop, step } = tourMetrics(tour, stories.length);
        index = Math.floor((stageTop - tour.getBoundingClientRect().top) / step);
      } else {
        // The story whose top has passed the middle of the screen is the one being read.
        const line = Math.max(pills.getBoundingClientRect().bottom + 40, window.innerHeight / 2);
        stories.forEach((story, i) => { if (story.getBoundingClientRect().top <= line) index = i; });
      }
      setActive(Math.max(0, Math.min(stories.length - 1, index)));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    touring.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      touring.removeEventListener("change", schedule);
    };
  }, []);

  // Only the current story is shown in the stage; the CSS reads data-active.
  useEffect(() => {
    tourRef.current?.querySelectorAll<HTMLElement>("[data-feature-story]").forEach((story, i) => {
      if (i === active) story.dataset.active = "true";
      else delete story.dataset.active;
    });
    // Keep the current pill visible when the bar scrolls sideways on phones.
    pillsRef.current?.children[active]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [active]);

  const go = (index: number) => {
    const tour = tourRef.current;
    if (!tour) return;
    const stories = tour.querySelectorAll<HTMLElement>("[data-feature-story]");
    const touring = window.matchMedia(TOUR_QUERY).matches;
    let top: number;
    if (touring) {
      // A third of the way into that story's stretch of scrolling, so a small nudge doesn't flip it.
      const { stageTop, step } = tourMetrics(tour, stories.length);
      top = window.scrollY + tour.getBoundingClientRect().top - stageTop + step * (index + 0.34);
    } else {
      const pillsBottom = pillsRef.current?.getBoundingClientRect().bottom ?? 0;
      top = window.scrollY + stories[index].getBoundingClientRect().top - pillsBottom - 24;
    }
    // The stage is pinned, so on wide screens jump straight there and let the story fade in; scrolling
    // smoothly would flash every story in between. The stacked list on phones scrolls smoothly.
    const smooth = !touring && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    heldRef.current = true;
    setActive(index);
    const release = () => {
      window.clearTimeout(fallback);
      window.removeEventListener("scrollend", release);
      heldRef.current = false;
      window.dispatchEvent(new Event("scroll"));
    };
    // scrollend isn't in every browser yet, so a timeout backs it up.
    const fallback = window.setTimeout(release, smooth ? 1200 : 100);
    if (smooth) window.addEventListener("scrollend", release);
    window.scrollTo({ top, behavior: smooth ? "smooth" : "instant" });
    history.replaceState(null, "", `#${features[index].id}`);
  };

  // Arriving on /#contracts and the like goes to that story.
  useEffect(() => {
    const index = features.findIndex((feature) => `#${feature.id}` === window.location.hash);
    if (index >= 0) requestAnimationFrame(() => go(index));
    // Runs once on load; `go` only reads refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={tourRef} className={styles.featureTour} style={{ "--count": features.length } as CSSProperties}>
      <div className={styles.featureFrame}>
        {heading}
        <nav ref={pillsRef} className={`${styles.featurePills} ${styles.scrollReveal}`} aria-label="Platform features" data-scroll-reveal>
          {features.map((feature, index) => (
            <a
              className={index === active ? styles.featurePillActive : undefined}
              aria-current={index === active ? "true" : undefined}
              href={`#${feature.id}`}
              key={feature.id}
              onClick={(event) => { event.preventDefault(); go(index); }}
            >
              {feature.label}
            </a>
          ))}
        </nav>
        <div className={styles.featureStage}>{children}</div>
      </div>
    </div>
  );
}

// Where the sticky frame pins, and how much scrolling each story gets: the tour's extra height
// (beyond one frame) split evenly between the stories.
function tourMetrics(tour: HTMLElement, count: number) {
  const frame = tour.firstElementChild as HTMLElement;
  const stageTop = parseFloat(getComputedStyle(frame).top) || 0;
  const step = Math.max(1, (tour.offsetHeight - frame.offsetHeight) / count);
  return { stageTop, step };
}
