"use client";

import { useEffect, useRef } from "react";

type GradientStop = {
  offset: number;
  color: string;
};

const GRADIENT_STOPS: GradientStop[] = [
  { offset: 0, color: "#242d6d" },
  { offset: 0.16, color: "#2e3b82" },
  { offset: 0.32, color: "#4168b8" },
  { offset: 0.5, color: "#4b7cd1" },
  { offset: 0.66, color: "#638fd9" },
  { offset: 0.8, color: "#8fb8ea" },
  { offset: 0.91, color: "#dce9fb" },
  { offset: 1, color: "#f7f9ff00" },
];

const VIEWBOX = {
  width: 1271,
  height: 599,
} as const;

const FIELD = {
  bars: 9,
  blur: 18,
  peak: 0.98,
  valley: 0.5,
  widthOverlap: 1.23,
  curvePower: 1.24,
} as const;

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD
 *
 *    0ms   scroll position maps gradient scaleY 0 → 1
 *  120ms   field eases toward the latest scroll position
 * +1 frame bottom overscroll stretches the field 1 → 1.16
 * +1 frame release begins the elastic decay back to 1
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  scrollSmoothing: 120,
  overscrollDecay: 0.84,
} as const;

const SCROLL = {
  revealDistanceVh: 0.61,
  bottomThresholdPx: 2,
  wheelGain: 0.00045,
  touchGain: 0.0012,
  nativeOverscrollGain: 0.001,
  maxOverscrollScale: 0.16,
  decayCutoff: 0.001,
  saturationGain: 2.2,
  brightnessGain: 0.5,
} as const;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function buildBellHeights() {
  const midpoint = (FIELD.bars - 1) / 2;

  return Array.from({ length: FIELD.bars }, (_, index) => {
    const distance = midpoint === 0 ? 0 : Math.abs(index - midpoint) / midpoint;
    const easedDistance = 1 - Math.pow(distance, FIELD.curvePower);

    return (
      FIELD.peak *
      VIEWBOX.height *
      (FIELD.valley + (1 - FIELD.valley) * easedDistance)
    );
  });
}

type DiaGradientProps = {
  className?: string;
  replayTrigger?: number;
};

export function DiaGradient({
  className,
  replayTrigger = 0,
}: DiaGradientProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const field = fieldRef.current;
    if (!root || !field) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      field.style.transform = "scaleY(1)";
      field.style.filter = "none";
      return;
    }

    let updateFrame = 0;
    let decayFrame = 0;
    let syntheticOverscroll = 0;
    let lastTouchY: number | null = null;

    const isAtPageBottom = () => {
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      return window.scrollY >= maxScroll - SCROLL.bottomThresholdPx;
    };

    const renderField = () => {
      updateFrame = 0;

      const viewportHeight = window.innerHeight || 1;
      const rootTop = root.getBoundingClientRect().top;
      const revealProgress = clamp(
        (viewportHeight - rootTop) /
          (viewportHeight * SCROLL.revealDistanceVh),
        0,
        1,
      );
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - viewportHeight,
      );
      const nativeOverscroll = clamp(
        Math.max(0, window.scrollY - maxScroll) * SCROLL.nativeOverscrollGain,
        0,
        SCROLL.maxOverscrollScale,
      );
      const overscroll = clamp(
        syntheticOverscroll + nativeOverscroll,
        0,
        SCROLL.maxOverscrollScale,
      );
      const scale = revealProgress * (1 + overscroll);

      field.style.transform = `scaleY(${scale})`;
      field.style.filter = `saturate(${1 + overscroll * SCROLL.saturationGain}) brightness(${1 + overscroll * SCROLL.brightnessGain})`;
    };

    const requestUpdate = () => {
      if (updateFrame) return;
      updateFrame = requestAnimationFrame(renderField);
    };

    const beginDecay = () => {
      cancelAnimationFrame(decayFrame);

      const decay = () => {
        syntheticOverscroll *= TIMING.overscrollDecay;
        if (syntheticOverscroll <= SCROLL.decayCutoff) {
          syntheticOverscroll = 0;
          requestUpdate();
          return;
        }

        requestUpdate();
        decayFrame = requestAnimationFrame(decay);
      };

      decayFrame = requestAnimationFrame(decay);
    };

    const addOverscroll = (distance: number, decayImmediately: boolean) => {
      syntheticOverscroll = clamp(
        syntheticOverscroll + distance,
        0,
        SCROLL.maxOverscrollScale,
      );
      requestUpdate();
      if (decayImmediately) beginDecay();
    };

    const handleWheel = (event: WheelEvent) => {
      if (!isAtPageBottom() || event.deltaY <= 0) return;
      addOverscroll(event.deltaY * SCROLL.wheelGain, true);
    };

    const handleTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const currentTouchY = event.touches[0]?.clientY;
      if (currentTouchY === undefined || lastTouchY === null) return;

      const distance = lastTouchY - currentTouchY;
      lastTouchY = currentTouchY;
      if (!isAtPageBottom() || distance <= 0) return;

      addOverscroll(distance * SCROLL.touchGain, false);
    };

    const handleTouchEnd = () => {
      lastTouchY = null;
      beginDecay();
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    requestUpdate();

    return () => {
      cancelAnimationFrame(updateFrame);
      cancelAnimationFrame(decayFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [replayTrigger]);

  const heights = buildBellHeights();
  const columnWidth = VIEWBOX.width / FIELD.bars;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={className}
    >
      <div
        ref={fieldRef}
        className="dia-gradient-reveal"
        style={{
          width: "100%",
          height: "100%",
          transformOrigin: "bottom",
          transform: "scaleY(0)",
          transition: `transform ${TIMING.scrollSmoothing}ms linear, filter ${TIMING.scrollSmoothing}ms linear`,
          willChange: "transform, filter",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="endo-dia-gradient"
              x1="0"
              y1="1"
              x2="0"
              y2="0"
            >
              {GRADIENT_STOPS.map((stop) => (
                <stop
                  key={`${stop.offset}-${stop.color}`}
                  offset={stop.offset}
                  stopColor={stop.color}
                />
              ))}
            </linearGradient>
            <filter
              id="endo-dia-blur"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation={FIELD.blur} />
            </filter>
          </defs>

          {heights.map((height, index) => (
            <g key={index} filter="url(#endo-dia-blur)">
              <rect
                x={index * columnWidth}
                y={VIEWBOX.height - height}
                width={columnWidth * FIELD.widthOverlap}
                height={height}
                fill="url(#endo-dia-gradient)"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
