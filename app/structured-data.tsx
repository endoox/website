import { SOCIAL_LINKS } from "@/lib/contact";

const SITE = "https://www.endodeals.com";
const ORGANIZATION_ID = `${SITE}/#organization`;

// schema.org data for search engines and AI answers. Pages reference the organization by its @id.
export const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "endo",
  url: SITE,
  logo: `${SITE}/brand/endo-app-icon.png`,
  description: "endo is the software behind modern sports agencies: contracts, deliverables, payments and endorsement valuations in one place.",
  email: "admin@endodeals.com",
  address: { "@type": "PostalAddress", addressLocality: "Toronto", addressRegion: "ON", addressCountry: "CA" },
  founder: ["Michael Boushy", "Jack Lavorato", "Anthony Baxter"].map((name) => ({ "@type": "Person", name })),
  sameAs: SOCIAL_LINKS.map((link) => link.href).filter(Boolean),
};

export const SOFTWARE = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "endo",
  url: SITE,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Software for sports agencies to manage endorsement deals: contracts, rosters, payments, deliverables, social analytics and pipeline.",
  publisher: { "@id": ORGANIZATION_ID },
};

export const VALUATION_SERVICE = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "endodeals",
  url: `${SITE}/endo-deals`,
  serviceType: "Athlete endorsement deal valuation",
  description: "Score the talent, price the full deal and show the brand why it fits. One endodeals report, back in 24 hours.",
  provider: { "@id": ORGANIZATION_ID },
};

export function JsonLd({ data }: { data: object }) {
  // Escaping "<" keeps any string in the data from closing the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
