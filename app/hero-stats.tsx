"use client";

import NumberFlow, { continuous } from "@number-flow/react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const HERO_STATS = [
  {
    start: 1_000_000,
    end: 10_000_000,
    currency: true,
    label: "endorsements managed on our platform",
    ariaLabel: "More than 10 million dollars in endorsements managed",
  },
  {
    start: 25,
    end: 250,
    currency: false,
    label: "athletes managed through endo",
    ariaLabel: "More than 250 athletes managed through Endo",
  },
  {
    start: 20_000,
    end: 200_000,
    currency: true,
    label: "value created through valuation tool",
    ariaLabel: "More than 200 thousand dollars in value created",
  },
] as const;

const compactFormat = {
  notation: "compact",
  maximumFractionDigits: 1,
} as const;

const flowTiming = {
  duration: 110,
  easing: "linear",
} as const;

const flowPlugins = [continuous];

const COUNT_DURATION = 2_400;
const COUNT_DELAY = 320;
const UPDATE_INTERVAL = 140;

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

export function HeroStats() {
  const listRef = useRef<HTMLDListElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [values, setValues] = useState<number[]>(() =>
    HERO_STATS.map((stat) => stat.start),
  );

  useEffect(() => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    const startAnimation = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setValues(HERO_STATS.map((stat) => stat.end));
        return;
      }

      let countStart = 0;
      let lastUpdate = 0;

      const animate = (now: number) => {
        if (countStart === 0) {
          countStart = now + COUNT_DELAY;
        }

        if (now < countStart) {
          animationFrameRef.current = requestAnimationFrame(animate);
          return;
        }

        const progress = Math.min(1, (now - countStart) / COUNT_DURATION);

        if (now - lastUpdate >= UPDATE_INTERVAL || progress === 1) {
          const easedProgress = easeInOutCubic(progress);

          setValues(
            HERO_STATS.map((stat) =>
              Math.round(
                stat.start + (stat.end - stat.start) * easedProgress,
              ),
            ),
          );
          lastUpdate = now;
        }

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(list);

    return () => {
      observer.disconnect();

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <dl
      ref={listRef}
      className={`${styles.heroStats} ${styles.scrollReveal}`}
      style={{ "--reveal-delay": "120ms" } as CSSProperties}
      data-scroll-reveal
      aria-label="Endo platform impact"
    >
      {HERO_STATS.map((stat, index) => (
        <div className={styles.heroStat} key={stat.label}>
          <dt>{stat.label}</dt>
          <dd aria-label={stat.ariaLabel}>
            <NumberFlow
              aria-hidden="true"
              className={styles.heroStatNumber}
              value={values[index]}
              locales="en-US"
              format={compactFormat}
              prefix={stat.currency ? "$" : ""}
              suffix="+"
              trend={1}
              plugins={flowPlugins}
              isolate
              willChange
              transformTiming={flowTiming}
              spinTiming={flowTiming}
              opacityTiming={{ duration: 120, easing: "ease-out" }}
            />
          </dd>
        </div>
      ))}
    </dl>
  );
}
