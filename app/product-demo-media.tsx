"use client";

import { useEffect, useRef, type RefObject } from "react";

// Plays the video only while it is on screen, and never under reduced motion.
// `once`: play the first time it scrolls into view, then leave it on its last frame.
function usePlayInView(videoRef: RefObject<HTMLVideoElement | null>, once = false) {
  useEffect(() => {
    const video = videoRef.current;

    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
          if (once) observer.disconnect();
        } else {
          video.pause();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoRef, once]);
}

type ProductDemoMediaProps = {
  className?: string;
  label: string;
  poster: string;
  src: string;
};

export function ProductDemoMedia({ className, label, poster, src }: ProductDemoMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  usePlayInView(videoRef);

  return (
    <video
      ref={videoRef}
      className={className}
      aria-label={label}
      loop
      muted
      playsInline
      poster={poster}
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support embedded product demos.
    </video>
  );
}

// Transparent loops: WebKit only renders alpha from HEVC (.mov); everyone else gets VP9 (.webm).
// Picked at runtime because Chrome also claims HEVC support but drops the alpha channel.
export function TransparentVideo({ className, name }: { className?: string; name: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const webkit = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    video.src = `/features/${name}.${webkit ? "mov" : "webm"}`;
    // Reduced motion never plays, so show the finished last frame instead of a possibly empty first one.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.addEventListener("loadedmetadata", () => { video.currentTime = video.duration; }, { once: true });
    }
  }, [name]);
  usePlayInView(videoRef, true);

  return <video ref={videoRef} className={className} aria-hidden="true" muted playsInline preload="auto" />;
}
