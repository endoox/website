import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { JsonLd, ORGANIZATION } from "./structured-data";
import { LINKEDIN_PARTNER_ID } from "@/lib/linkedin";
import { shareMetadata } from "@/lib/share-metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "endo · The software behind the modern sports agency";
const description =
  "endo is the software behind modern sports agencies. Never miss a payment or deliverable, price every deal right, and get more time to do what you do best.";

// Site-wide defaults; pages override title and description. metadataBase makes relative URLs absolute
// for search engines and link previews.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.endodeals.com"),
  title,
  description,
  alternates: { canonical: "./" },
  ...shareMetadata(title, description),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <JsonLd data={ORGANIZATION} />
        {children}
        {/* Analytics and ad tracking; production only, so local dev visits stay out of the data. */}
        {process.env.NODE_ENV === "production" && (
          <>
            {/* Hedlyte session recording. */}
            <Script id="hedlyte-config" strategy="beforeInteractive">
              {`window.RRWEB_SERVER_URL="https://ingest.hedlyte.com/upload-session";`}
            </Script>
            <Script src="https://ingest.hedlyte.com/recorder.js" data-domain-key="ef52d4df52bd760d98ffc4132bd02387" />
            {/* LinkedIn Insight Tag: ad attribution and the conversions fired by trackLinkedIn (lib/linkedin.ts). */}
            <Script id="linkedin-insight" strategy="afterInteractive">
              {`_linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);`}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element -- a tracking pixel, not content */}
              <img height="1" width="1" style={{ display: "none" }} alt="" src={`https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_PARTNER_ID}&fmt=gif`} />
            </noscript>
          </>
        )}
      </body>
    </html>
  );
}
