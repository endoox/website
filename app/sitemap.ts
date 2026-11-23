import type { MetadataRoute } from "next";
import { CUSTOMER_STORIES } from "@/lib/customer-stories";
import { PRESS } from "@/lib/press";

const SITE = "https://www.endodeals.com";

// Only dates we actually know: the legal pages' own dates, the newest press item, and each story's date.
const LAST_MODIFIED: Record<string, string | undefined> = {
  "/privacy": "2025-06-26",
  "/terms": "2026-09-16",
  "/press": PRESS[0]?.date,
  "/customer-stories": CUSTOMER_STORIES[0]?.date,
  ...Object.fromEntries(CUSTOMER_STORIES.map((story) => [`/customer-stories/${story.slug}`, story.date])),
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/endo-deals",
    "/about",
    "/book",
    ...(CUSTOMER_STORIES.length > 0 ? ["/customer-stories", ...CUSTOMER_STORIES.map((story) => `/customer-stories/${story.slug}`)] : []),
    ...(PRESS.length > 0 ? ["/press"] : []),
    "/privacy",
    "/terms",
  ];
  return pages.map((path) => ({
    url: `${SITE}${path}`,
    ...(LAST_MODIFIED[path] ? { lastModified: LAST_MODIFIED[path] } : {}),
    changeFrequency: path === "/privacy" || path === "/terms" ? "yearly" : "monthly",
    priority: path === "" ? 1 : path === "/privacy" || path === "/terms" ? 0.3 : 0.7,
  }));
}
