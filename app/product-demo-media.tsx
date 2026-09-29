"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";

// Downloads the clip whole and plays it from a blob URL. Safari will only stream <video> from servers
// that answer byte-range requests, which some hosts (e.g. Cloudflare static assets) don't; a blob
// sidesteps that on any host. Clips are small (~1MB). Plays only while on screen, never under
// reduced motion. `replayAfter` (ms): hold on the last frame that long, then restart from the top.
function useInViewVideo(videoRef: RefObject<HTMLVideoElement | null>, src: string | (() => string), replayAfter?: number) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controller = new AbortController();
    let blobUrl = "";
    let ready = false;
    let inView = false;
    let replayTimer = 0;

    const sync = () => {
      if (!ready || reducedMotion) return;
      if (inView) {
        void video.play().catch(() => undefined);
      } else {
        window.clearTimeout(replayTimer);
        video.pause();
      }
    };

    const scheduleReplay = () => {
      replayTimer = window.setTimeout(() => {
        video.currentTime = 0;
        sync();
      }, replayAfter);
    };
    if (replayAfter !== undefined) video.addEventListener("ended", scheduleReplay);

    fetch(typeof src === "function" ? src() : src, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Video request failed: ${response.status}`);
        return response.blob();
      })
      .then((blob) => {
        blobUrl = URL.createObjectURL(blob);
        video.src = blobUrl;
        ready = true;
        // Reduced motion never plays, so show the clip's finished last frame instead of its first.
        if (reducedMotion && replayAfter !== undefined) {
          video.addEventListener("loadedmetadata", () => { video.currentTime = video.duration; }, { once: true });
        }
        sync();
      })
      .catch(() => undefined);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.28 },
    );
    observer.observe(video);

    return () => {
      controller.abort();
      observer.disconnect();
      window.clearTimeout(replayTimer);
      video.removeEventListener("ended", scheduleReplay);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [videoRef, src, replayAfter]);
}

// Transparent clips: WebKit only renders alpha from HEVC (.mov); everyone else gets VP9 (.webm).
// Picked at runtime because Chrome also claims HEVC support but drops the alpha channel.
const transparentSrc = (name: string) => () =>
  `/features/${name}.${/^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? "mov" : "webm"}`;

export function TransparentVideo({ className, name }: { className?: string; name: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = useMemo(() => transparentSrc(name), [name]);
  useInViewVideo(videoRef, src, 5000);

  return <video ref={videoRef} className={className} aria-hidden="true" muted playsInline />;
}
