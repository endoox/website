import type { Metadata } from "next";

export const SHARE_IMAGE_ALT = "endo · The software behind the modern sports agency";

// A page's openGraph/twitter objects replace the root layout's wholesale, so every page builds them
// here to keep the shared preview image (app/opengraph-image.tsx).
const image = { url: "/opengraph-image", width: 1200, height: 630, alt: SHARE_IMAGE_ALT };

// Pass `cover` (a 1200×630-ish public image path) to share a page-specific image instead.
export function shareMetadata(title: string, description?: string, cover?: { url: string; alt: string }): Pick<Metadata, "openGraph" | "twitter"> {
  const images = [cover ?? image];
  return {
    openGraph: { title, description, url: "./", siteName: "endo", type: "website", images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
