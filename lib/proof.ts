// Customer logos and testimonials shown on the home page (app/page.tsx) and the partner hub
// (app/partners). Only agencies and quotes that are public on endodeals.com belong here.

// box = display size in px (scaled down on mobile). flat preserves tones in detailed marks.
export const TRUSTED_BY_LOGOS = [
  { name: "ORR Hockey Group", src: "/trusted-by/orr-hockey-group.png", width: 200, height: 200, box: [92, 92], flat: true },
  { name: "RHSEVEN", src: "/trusted-by/rhseven-white.png", width: 280, height: 77, box: [150, 44] },
  { name: "Envision Sports & Entertainment", src: "/trusted-by/envision-sports-entertainment.png", width: 300, height: 136, box: [140, 64], flat: true },
  { name: "Quartexx Management", src: "/trusted-by/quartexx.png", width: 343, height: 115, box: [175, 62] },
  { name: "Peak Athletes", src: "/trusted-by/peak-athletes.png", width: 1200, height: 1200, box: [82, 82] },
  { name: "KHG Sports Management", src: "/trusted-by/khg-sports-management.png", width: 447, height: 447, box: [76, 76], flat: true },
  { name: "Cook Stark Management", src: "/trusted-by/cook-stark.png", width: 200, height: 200, box: [100, 80], flat: true },
  { name: "Oasis Sports Group", src: "/trusted-by/oasis-agency.png", width: 522, height: 464, box: [84, 74], flat: true },
  { name: "US Sports Agency", src: "/trusted-by/us-sports-agency.png", width: 300, height: 300, box: [72, 72] },
  { name: "Tonbara", src: "/trusted-by/tonbara-wordmark.png", width: 794, height: 183, box: [175, 46] },
  { name: "RSG Hockey", src: "/trusted-by/rsg-hockey.png", width: 458, height: 93, box: [178, 62] },
] as const;


export const TESTIMONIALS = [
  {
    name: "Shelbi Kilcollins",
    role: "Director of Marketing · Quartexx Management",
    image: "/testimonials/shelbi-kilcollins.png",
    quote:
      "endo has anchored Quartexx's marketing efforts and has been key to our team's strategic growth. It's helped us streamline the high volume of administrative work that comes with endorsement deals, made our sales outreach more efficient and left us better prepared for negotiations. When we look back on our marketing wins in a few years, endo will be a big part of the 'why.'",
  },
  {
    name: "Tyler Wagner",
    role: "Director of Marketing · Roy Sports Group",
    image: "/testimonials/tyler-wagner.png",
    quote:
      "Instead of going into brand conversations with assumptions, we now have credible data to support our pricing. It gives us real leverage.",
  },
  {
    name: "Patrik Darabont",
    role: "Founder & Principal · Tonbara Sports & Entertainment",
    image: "/testimonials/patrik-darabont.png",
    quote:
      "Representing athletes across a dozen sports means no two deals look alike. endo gives us one consistent, data-backed read on value across all of them.",
  },
  {
    name: "Drew Hardee",
    role: "Vice President · KHG Sports Management",
    image: "/testimonials/drew-hardee.png",
    quote:
      "endo and the team there, have helped create a hub for our agency enhancing our processes to provide the highest level of service to our clients.",
  },
  {
    name: "Nic Métayer",
    role: "Founder · Peak Athletes",
    image: "/testimonials/nic-metayer.png",
    quote:
      "This wasn't off-the-shelf. It was built with us, around the way a modern sports agency actually works.",
  },
  {
    name: "Lander Cook",
    role: "Co-Founder, CEO · Cook Stark Management",
    image: "/testimonials/lander-cook.png",
    quote:
      "endo has significantly streamlined our fast-growing business and made it easier to see the full picture without having to check multiple different places to reconcile schedules, values, or other information. The user interface is accessible and simple and it provides us with ways to track timelines and deliverables across our team of agents.",
  },
] as const;
