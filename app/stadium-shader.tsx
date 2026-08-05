"use client";

import { HalftoneCmyk } from "@paper-design/shaders-react";

type StadiumShaderProps = {
  className?: string;
};

export function StadiumShader({ className }: StadiumShaderProps) {
  return (
    <HalftoneCmyk
      aria-hidden="true"
      className={className}
      image="/hero/endo-stadium.webp"
      colorBack="#020816"
      colorC="#1596ff"
      colorM="#1656c8"
      colorY="#79c7ff"
      colorK="#01040d"
      size={0.112}
      contrast={1.62}
      softness={0.1}
      grainSize={0.17}
      grainMixer={0.14}
      grainOverlay={0.09}
      gridNoise={0.06}
      floodC={0.18}
      floodM={-0.04}
      floodY={-0.25}
      floodK={0.15}
      gainC={0.62}
      gainM={0.18}
      gainY={-0.25}
      gainK={0.3}
      type="dots"
      fit="cover"
      scale={1.22}
      offsetY={0.025}
      speed={0}
      minPixelRatio={1}
      maxPixelCount={2_073_600}
    />
  );
}
