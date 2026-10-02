import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SHARE_IMAGE_ALT } from "@/lib/share-metadata";

// Shared link preview for every page (X, LinkedIn, iMessage, Slack...). Rendered at build time.
export const alt = SHARE_IMAGE_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/brand/endo-logo-footer.png"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "84px 96px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#242d6d",
          backgroundImage: "radial-gradient(ellipse 900px 460px at 50% -120px, rgba(75, 124, 209, 0.6), rgba(36, 45, 109, 0))",
          color: "#fff",
        }}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text -- rendered to PNG by next/og */}
        <img src={`data:image/png;base64,${logo.toString("base64")}`} width={231} height={60} />
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ maxWidth: 900, fontSize: 76, letterSpacing: "-0.045em", lineHeight: 1.02 }}>
            The software behind the modern sports agency
          </div>
          <div style={{ maxWidth: 1010, color: "rgba(255, 255, 255, 0.66)", fontSize: 30, lineHeight: 1.4 }}>
            Never miss a payment or deliverable, and price every deal right.
          </div>
        </div>
        <div style={{ display: "flex", color: "#8fb8ea", fontSize: 26 }}>endodeals.com</div>
      </div>
    ),
    size,
  );
}
