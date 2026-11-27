// Everything on the endo partners hub (app/partners) that you'd want to edit: partner codes, links,
// copy, the intro template and the contact cards. Layout lives in app/partners; see content/README.md.
// Only use wording and facts that are already public on endodeals.com, and never add pricing.

// ---------- Access ----------
// Anyone with a code can open the hub. The gate is cosmetic: codes ship in the page's code, so nothing
// private belongs behind it. Leave partnerName blank for a shared code; the greeting then says
// "Welcome to endo partners" instead of "Welcome, Thomas".
export const PARTNER_CODES: { code: string; partnerName: string }[] = [
  { code: "endopartner", partnerName: "" },
];

// ---------- Links ----------
// The demo video, as any YouTube link: youtube.com/watch?v=…, youtu.be/… or a share link.
// Leave blank to show a "coming soon" frame in its place.
export const DEMO_VIDEO_URL = "";
// A Google Drive folder with the full partner material. Leave blank to hide the Drive buttons.
export const DRIVE_URL = "";

// ---------- Entry ----------
export const ENTRY = {
  title: "Welcome to endo partners",
  line: "Everything you need to talk about endo and introduce an agency, in one place.",
};

// ---------- Hub ----------
export const HUB = {
  intro: "Everything you need to talk about endo and introduce an agency: the demo, the story, the brand files and how to make the intro.",
};

// Six cards. The headings are the home page's feature titles (the first reworded); each line comes from the site.
export const KEY_POINTS = [
  { title: "Value every endorsement deal so you can get fair market value for your clients.", body: "Score the talent, price the deal and show the brand why it fits." },
  { title: "Every agreement, term, and renewal in one place.", body: "endo turns contracts into payment schedules and deliverables in seconds." },
  { title: "Know exactly what is paid, pending, and overdue.", body: "endo flags every payment that is due, right on the roster." },
  { title: "Every post delivered, approved, and measured.", body: "With deliverables, deadlines and approvals tracked in endo, the team knows exactly what is owed and when." },
  { title: "See the whole business behind your roster.", body: "Roster, contracts, schedules and deals live in one shared platform. Every agent sees the same information." },
  { title: "Turn every conversation into momentum.", body: "Agencies use endo to make their sales outreach more efficient and go into negotiations better prepared." },
] as const;

// The brand colours, as used in the logo and across endodeals.com.
export const BRAND_COLOURS = [
  { name: "Ink", hex: "#2B2B2B", use: "Wordmark and text" },
  { name: "endo blue", hex: "#4B7CD1", use: "Primary accent" },
  { name: "Deep navy", hex: "#242D6D", use: "Dark backgrounds" },
  { name: "Sky", hex: "#8FB8EA", use: "Highlights" },
] as const;

// Files in public/resources. `background` is the tile colour each one is shown on.
export const LOGO_FILES = [
  { name: "Full colour", file: "endo-logo-full-colour.png", background: "#FFFFFF", width: 2826, height: 1214 },
  { name: "Full colour, reversed", file: "endo-logo-full-colour-reversed.png", background: "#242D6D", width: 2826, height: 1214 },
  { name: "Black", file: "endo-logo-black.png", background: "#F5F7FA", width: 2826, height: 1214 },
  { name: "White", file: "endo-logo-white.png", background: "#2B2B2B", width: 2826, height: 1214 },
  { name: "Icon", file: "endo-icon.png", background: "#F5F7FA", width: 2161, height: 2161 },
] as const;
// Built from LOGO_FILES on every dev start and build (scripts/build-partner-kit.mjs).
export const BRAND_KIT_ZIP = "endo-brand-kit.zip";

// Press cards in the Proof section, in this order, by outlet name as written in lib/press.ts.
// Outlets not listed here follow, newest first.
export const PRESS_ORDER = ["Sports Business Journal", "BetaKit", "PressBeta", "Dealroom"] as const;

// The one-pager as a PDF in public/resources. Rebuild it after changing ONE_PAGER: run `npm run dev`,
// then `npm run partners:pdf` (see content/README.md).
export const ONE_PAGER_PDF = "endo-one-pager.pdf";

// The one-pager: a printable summary built from the website copy.
export const ONE_PAGER = {
  headline: "The software behind modern sports agencies.",
  subhead: "Never miss a payment or deliverable, price every deal right, and get more time to do what you do best.",
  about: "endo is the software behind modern sports agencies. We give agents the tools to run their whole business, and the numbers to show what their talent is really worth.",
  // The headline numbers.
  stats: [
    { value: "$25M+", label: "in endorsement deals managed on endo" },
    { value: "48", label: "leagues represented across our partner agencies" },
    { value: "10–15", label: "hours saved per week using endo" },
  ],
  quote: {
    text: "Instead of going into brand conversations with assumptions, we now have credible data to support our pricing. It gives us real leverage.",
    name: "Tyler Wagner",
    role: "Director of Marketing · Roy Sports Group",
  },
  // The press article to feature, by outlet name as written in lib/press.ts.
  featuredIn: "Sports Business Journal",
  contact: "Michael Boushy, Co-founder & CEO · mike@endodeals.com · endodeals.com",
} as const;

// ---------- How to make an intro ----------
export const INTRO_STEPS = [
  { title: "Send the agency a short intro", body: "Copy Mike on a short email to the agency. Use the template below, or put it in your own words." },
  { title: "Let Jack know", body: "Email jack@endodeals.com the agency name, the contact and a line of context, so we can log the intro to you." },
  { title: "Mike takes it from there", body: "Mike follows up with the agency and takes the first meeting." },
] as const;

// The intro email. [Agent name] and [Your name] are for the partner to fill in.
export const INTRO_TEMPLATE = `Hi [Agent name],

I wanted to introduce you to Michael Boushy, co-founder of endo (endodeals.com). endo helps agencies manage and value their athletes' endorsement deals in one place: rosters, contracts, deliverables and payments, plus valuations that show what a deal is actually worth.

I think it could save your team a lot of admin and help in negotiations. Mike, I'll let you take it from here.

Best,
[Your name]`;

export const INTRO_LOG_EMAIL = "jack@endodeals.com";

// ---------- FAQ ----------
export const FAQ = [
  {
    question: "What does endo do?",
    answer: "endo is the software behind modern sports agencies. Agencies use it to run their whole business in one place (rosters, contracts, deliverables, payments and pipeline) and to value their athletes' endorsement deals with endodeals.",
  },
  {
    question: "Is agency data secure?",
    answer: "Agency data is stored on secure cloud infrastructure, protected by administrative, physical and technical safeguards and industry-standard secure development practices. An agency's deals stay theirs: nothing they enter is shown to anyone else.",
  },
  {
    question: "What does endo cost?",
    answer: "Pricing depends on the agency's size and needs. Mike will walk them through it on the first call.",
  },
  {
    question: "What happens after I make an intro?",
    answer: "Mike reaches out to the agency and takes the first meeting. Once you've emailed Jack the agency name and contact, the intro is logged to you.",
  },
  {
    question: "How and when do partners get paid?",
    answer: "Partners are paid quarterly, on revenue endo has collected from the agencies they introduced.",
  },
] as const;

// ---------- Contact ----------
export const CONTACTS = [
  {
    name: "Michael Boushy",
    role: "Co-founder & CEO",
    focus: "Sales and intros",
    email: "mike@endodeals.com",
    linkedin: "https://www.linkedin.com/in/michaelboushy/",
    image: "/team/michael-boushy-headshot.png",
  },
  {
    name: "Jack Lavorato",
    role: "Co-founder & COO",
    focus: "Partner program and payouts",
    email: "jack@endodeals.com",
    linkedin: "https://www.linkedin.com/in/jackalavorto/",
    phone: "403-992-5446",
    image: "/team/jack-lavorato-avatar.png",
  },
] as const;
