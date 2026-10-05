import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Serves prerendered routes (e.g. the share image, which reads a file at build time) from the
// Worker's static assets. Read-only: fine here because nothing revalidates.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
