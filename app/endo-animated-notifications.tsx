"use client"

import { AnimatedList } from "@/components/ui/animated-list"
import { cn } from "@/lib/utils"

interface NotificationItem {
  name: string
  description: string
  icon: string
  color: string
  time: string
}

const notificationSet: NotificationItem[] = [
  {
    name: "Payment received",
    description: "$48,000 collected from Crown Mobile",
    time: "15m ago",
    icon: "💸",
    color: "#00a987",
  },
  {
    name: "Contract signed",
    description: "Northstar × Jordan Mills · $72.5K",
    time: "10m ago",
    icon: "✍️",
    color: "#167ee8",
  },
  {
    name: "Deliverable approved",
    description: "Campaign post marked complete",
    time: "5m ago",
    icon: "✅",
    color: "#7c5ce7",
  },
  {
    name: "New opportunity",
    description: "Nike × Avery Cole · Proposal stage",
    time: "3m ago",
    icon: "🤝",
    color: "#f39b2f",
  },
  {
    name: "Valuation updated",
    description: "Recommended value increased to $86K",
    time: "2m ago",
    icon: "📈",
    color: "#ef5c89",
  },
  {
    name: "Renewal ready",
    description: "Apex Hydration renews in 30 days",
    time: "1m ago",
    icon: "🔄",
    color: "#20a9c9",
  },
  {
    name: "Payment scheduled",
    description: "$24,500 expected this Friday",
    time: "now",
    icon: "📅",
    color: "#3355c5",
  },
  {
    name: "Approval requested",
    description: "Brand terms are ready for review",
    time: "now",
    icon: "🔔",
    color: "#db6d35",
  },
]

const notifications = Array.from({ length: 3 }, () => notificationSet).flat()

function Notification({
  name,
  description,
  icon,
  color,
  time,
}: NotificationItem) {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[430px] overflow-hidden rounded-[20px] p-[18px]",
        "transform-gpu bg-white transition-transform duration-200 ease-out hover:scale-[1.025]",
        "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-xl leading-none">{icon}</span>
        </div>
        <div className="flex min-w-0 flex-col overflow-hidden">
          <figcaption className="flex min-w-0 flex-row items-baseline whitespace-nowrap">
            <span className="truncate text-[16px] font-medium tracking-[-0.015em] text-[#111827]">
              {name}
            </span>
            <span className="mx-1.5 text-xs text-gray-400">·</span>
            <span className="shrink-0 text-[13px] font-normal text-gray-400">{time}</span>
          </figcaption>
          <p className="truncate text-[14px] font-normal leading-5 text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </figure>
  )
}

export function EndoAnimatedNotifications({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden px-2 py-1",
        className
      )}
    >
      <AnimatedList className="mx-auto w-full max-w-[430px] gap-3" delay={1450} maxItems={5}>
        {notifications.map((item, index) => (
          <Notification {...item} key={`${item.name}-${index}`} />
        ))}
      </AnimatedList>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/85 to-transparent" />
    </div>
  )
}
