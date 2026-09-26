"use client";

import Image from "next/image";
import { BellRing } from "lucide-react";
import { MotionConfig } from "motion/react";
import { forwardRef, useRef, type ReactNode } from "react";

import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

const IntegrationNode = forwardRef<
  HTMLDivElement,
  { children: ReactNode; className?: string }
>(({ children, className }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative z-10 flex size-14 items-center justify-center rounded-full border border-[#dce5ef] bg-white p-3 shadow-[0_8px_24px_rgba(7,27,51,.08)]",
      className,
    )}
  >
    {children}
  </div>
));

IntegrationNode.displayName = "IntegrationNode";

function SheetsIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="size-full">
      <path fill="#0F9D58" d="M9 4h21l9 9v31H9z" />
      <path fill="#87CEAC" d="M30 4v10h9z" />
      <path fill="#fff" d="M15 20h18v16H15zm3 3v3h5v-3zm8 0v3h4v-3zm-8 6v4h5v-4zm8 0v4h4v-4z" />
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="size-full">
      <path fill="#4285F4" d="M6 12.5 12 17v20H8a2 2 0 0 1-2-2z" />
      <path fill="#34A853" d="M42 12.5 36 17v20h4a2 2 0 0 0 2-2z" />
      <path fill="#EA4335" d="M6 12.5V11a3 3 0 0 1 4.8-2.4L24 18.5 37.2 8.6A3 3 0 0 1 42 11v1.5L24 26z" />
      <path fill="#FBBC04" d="M6 12.5 24 26l-3 2.2L6 17z" />
      <path fill="#C5221F" d="M42 12.5 24 26l3 2.2L42 17z" />
    </svg>
  );
}

export function EndoIntegrationBeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sheetsRef = useRef<HTMLDivElement>(null);
  const gmailRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const endoRef = useRef<HTMLDivElement>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div ref={containerRef} className="relative size-full overflow-hidden">
        <IntegrationNode ref={sheetsRef} className="absolute top-2 left-[9%]">
          <SheetsIcon />
        </IntegrationNode>
        <IntegrationNode
          ref={gmailRef}
          className="absolute top-1/2 left-[9%] -translate-y-1/2"
        >
          <GmailIcon />
        </IntegrationNode>
        <IntegrationNode
          ref={notificationRef}
          className="absolute bottom-2 left-[9%] text-[#4b7cd1]"
        >
          <BellRing aria-hidden="true" className="size-7" strokeWidth={1.8} />
        </IntegrationNode>
        <IntegrationNode
          ref={endoRef}
          className="absolute top-1/2 right-[8%] size-28 -translate-y-1/2 p-4 shadow-[0_14px_36px_rgba(7,27,51,.11)]"
        >
          <span className="relative block h-[24px] w-[84px] overflow-hidden">
            <Image
              src="/brand/endo-logo-dark.png"
              alt="endo"
              width={2826}
              height={1214}
              sizes="84px"
              className="absolute top-1/2 left-0 h-auto w-full -translate-y-1/2"
            />
          </span>
        </IntegrationNode>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={sheetsRef}
          toRef={endoRef}
          curvature={-54}
          pathColor="#d9e4ef"
          pathOpacity={0.78}
          gradientStartColor="#34a853"
          gradientStopColor="#4b7cd1"
          duration={3.6}
          startXOffset={28}
          endXOffset={-56}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={gmailRef}
          toRef={endoRef}
          curvature={0}
          pathColor="#d9e4ef"
          pathOpacity={0.78}
          gradientStartColor="#ea4335"
          gradientStopColor="#4b7cd1"
          delay={0.55}
          duration={3.6}
          startXOffset={28}
          endXOffset={-56}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={notificationRef}
          toRef={endoRef}
          curvature={54}
          pathColor="#d9e4ef"
          pathOpacity={0.78}
          gradientStartColor="#8fb8ea"
          gradientStopColor="#242d6d"
          delay={1.1}
          duration={3.6}
          startXOffset={28}
          endXOffset={-56}
        />
      </div>
    </MotionConfig>
  );
}
