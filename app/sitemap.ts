import type { MetadataRoute } from "next";
import { PRESS } from "@/lib/press";

const SITE = "https://www.endodeals.com";

// Only dates we actually know: the legal pages' own dates, and the newest press item.
const LAST_MODIFIED: Record<string, string | undefined> = {
  "/privacy": "2025-06-26",
  "/terms": "2026-09-16",
  "/press": PRESS[0]?.date,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/endo-deals", "/about", "/book", ...(PRESS.length > 0 ? ["/press"] : []), "/privacy", "/terms"];
  return pages.map((path) => ({
    url: `${SITE}${path}`,
    ...(LAST_MODIFIED[path] ? { lastModified: LAST_MODIFIED[path] } : {}),
    changeFrequency: path === "/privacy" || path === "/terms" ? "yearly" : "monthly",
    priority: path === "" ? 1 : path === "/privacy" || path === "/terms" ? 0.3 : 0.7,
  }));
}
