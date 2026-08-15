"use client";

import type { COBEOptions } from "cobe";

import { Globe } from "@/components/ui/globe";

const ENDO_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.7,
  mapSamples: 16000,
  mapBrightness: 1.25,
  baseColor: [0.88, 0.95, 1],
  markerColor: [0.08, 0.49, 0.91],
  glowColor: [0.94, 0.98, 1],
  markers: [
    { location: [40.7128, -74.006], size: 0.09 },
    { location: [34.0522, -118.2437], size: 0.07 },
    { location: [43.6532, -79.3832], size: 0.06 },
    { location: [51.5072, -0.1276], size: 0.06 },
    { location: [48.8566, 2.3522], size: 0.05 },
    { location: [25.2048, 55.2708], size: 0.05 },
    { location: [35.6762, 139.6503], size: 0.06 },
    { location: [-33.8688, 151.2093], size: 0.05 },
  ],
};

export function EndoGlobe({ className }: { className?: string }) {
  return <Globe className={className} config={ENDO_GLOBE_CONFIG} />;
}
