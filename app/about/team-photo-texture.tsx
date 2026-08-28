"use client";

import { HalftoneCmyk } from "@paper-design/shaders-react";

interface TeamPhotoTextureProps {
  className?: string;
  image: string;
  label: string;
}

export function TeamPhotoTexture({ className, image, label }: TeamPhotoTextureProps) {
  return (
    <div className={className} role="img" aria-label={label}>
      <HalftoneCmyk
        width="100%"
        height="100%"
        image={image}
        colorBack="#fbfaf4"
        colorC="#00b3ff"
        colorM="#fc4f9d"
        colorY="#ffd900"
        colorK="#231f20"
        size={0.2}
        gridNoise={0.2}
        type="ink"
        softness={1}
        contrast={1}
        floodC={0.15}
        floodM={0}
        floodY={0}
        floodK={0}
        gainC={0.3}
        gainM={0}
        gainY={0.2}
        gainK={0}
        grainMixer={0}
        grainOverlay={0}
        grainSize={0.5}
        fit="cover"
        aria-hidden="true"
      />
    </div>
  );
}
