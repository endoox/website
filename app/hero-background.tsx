"use client";

import { GodRays } from "@paper-design/shaders-react";
import { useEffect, useState } from "react";

type HeroBackgroundProps = {
  className?: string;
};

export function HeroBackground({ className }: HeroBackgroundProps) {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateSpeed = () => setSpeed(motionQuery.matches ? 0 : 0.12);

    updateSpeed();
    motionQuery.addEventListener("change", updateSpeed);

    return () => motionQuery.removeEventListener("change", updateSpeed);
  }, []);

  return (
    <GodRays
      aria-hidden="true"
      className={className}
      colorBack="#242d6d"
      colorBloom="#4b7cd1"
      colors={["#4b7cd1d8", "#8fb8ea9c", "#dce9fb62", "#4168b8b8"]}
      density={0.3}
      spotty={0.34}
      midSize={0.12}
      midIntensity={0.42}
      intensity={0.78}
      bloom={0.48}
      speed={speed}
      fit="cover"
      scale={1.16}
      offsetY={-0.42}
      minPixelRatio={1}
      maxPixelCount={2_073_600}
    />
  );
}
