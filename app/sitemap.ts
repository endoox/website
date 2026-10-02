import type { MetadataRoute } from "next";
import { PRESS } from "@/lib/press";

const SITE = "https://www.endodeals.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/endo-deals", "/about", "/book", ...(PRESS.length > 0 ? ["/press"] : []), "/privacy", "/terms"];
  return pages.map((path) => ({
    url: `${SITE}${path}`,
    changeFrequency: path === "/privacy" || path === "/terms" ? "yearly" : "monthly",
    priority: path === "" ? 1 : path === "/privacy" || path === "/terms" ? 0.3 : 0.7,
  }));
}
