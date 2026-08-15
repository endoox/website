import Image from "next/image";

import { Marquee } from "@/components/ui/marquee";

const DEALS = [
  {
    athlete: "Jordan Mills",
    brand: "Northstar",
    category: "Apparel",
    value: "$72.5K",
    details: "6 deliverables · 3 months",
    profile: "/testimonials/farren-benjamin.png",
  },
  {
    athlete: "Avery Cole",
    brand: "Apex Hydration",
    category: "Beverage",
    value: "$48K",
    details: "4 posts · 1 appearance",
    profile: "/testimonials/nic-metayer.png",
  },
  {
    athlete: "Cam Reed",
    brand: "Crown Mobile",
    category: "Technology",
    value: "$125K",
    details: "Annual category partner",
    profile: "/testimonials/tyler-wagner.png",
  },
  {
    athlete: "Maya Brooks",
    brand: "Velocity Auto",
    category: "Automotive",
    value: "$84K",
    details: "8 deliverables · 6 months",
    profile: "/testimonials/shelbi-kilcollins.png",
  },
  {
    athlete: "Eli Morgan",
    brand: "Summit Health",
    category: "Wellness",
    value: "$56K",
    details: "3 posts · 1 campaign shoot",
    profile: "/testimonials/charlie-di-bratto.png",
  },
  {
    athlete: "Noah Grant",
    brand: "Vantage Audio",
    category: "Consumer tech",
    value: "$96K",
    details: "12-month ambassador deal",
    profile: "/testimonials/farren-benjamin.png",
  },
] as const;

const FIRST_ROW = DEALS.slice(0, DEALS.length / 2);
const SECOND_ROW = DEALS.slice(DEALS.length / 2);

function DealCard({
  athlete,
  brand,
  category,
  value,
  details,
  profile,
}: (typeof DEALS)[number]) {
  return (
    <figure className="grid h-[102px] w-[360px] shrink-0 grid-cols-[48px_minmax(0,1fr)] items-center gap-4 rounded-2xl border bg-card px-5 py-4">
      <Image
        src={profile}
        alt=""
        width={48}
        height={48}
        className="size-12 rounded-full border object-cover"
      />
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex min-w-0 items-baseline justify-between gap-4">
          <figcaption className="truncate text-sm font-semibold tracking-[-0.015em] text-foreground">
            {athlete}
          </figcaption>
          <strong className="shrink-0 text-lg font-semibold tracking-[-0.04em] text-foreground">
            {value}
          </strong>
        </div>
        <p className="truncate text-xs font-medium text-foreground/65">
          {brand} · {category}
        </p>
        <p className="truncate text-[11px] text-muted-foreground">{details}</p>
      </div>
    </figure>
  );
}

export function EndoDealMarquee() {
  return (
    <div className="relative flex size-full flex-col justify-center gap-2 overflow-hidden">
      <Marquee pauseOnHover className="[--duration:24s] [--gap:.75rem] p-0">
        {FIRST_ROW.map((deal) => (
          <DealCard key={`${deal.athlete}-${deal.brand}`} {...deal} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:26s] [--gap:.75rem] p-0">
        {SECOND_ROW.map((deal) => (
          <DealCard key={`${deal.athlete}-${deal.brand}`} {...deal} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
