"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { LINKEDIN_PARTNER_ID } from "@/lib/linkedin";

// The LinkedIn Insight Tag: ad attribution and the conversions fired by trackLinkedIn (lib/linkedin.ts).
// The partner hub (app/partners) runs no tracking, so it's left out there.
export function AdTracking() {
  if (usePathname().startsWith("/partners")) return null;
  return (
    <>
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
  );
}
