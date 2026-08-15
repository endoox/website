"use client"

import React, {
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type MotionProps,
} from "motion/react"

import { cn } from "@/lib/utils"

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()
  const animations: MotionProps = {
    initial: shouldReduceMotion ? false : { y: -10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: shouldReduceMotion ? undefined : { y: 10, opacity: 0 },
    transition: { type: "spring", stiffness: 320, damping: 34 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
  maxItems?: number
}

export const AnimatedList = React.memo(
  ({
    children,
    className,
    delay = 1000,
    maxItems = 3,
    ...props
  }: AnimatedListProps) => {
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    )
    const [sequence, setSequence] = useState(
      () => Math.min(maxItems, childrenArray.length) - 1
    )

    useEffect(() => {
      if (childrenArray.length < 2) return

      const interval = window.setInterval(() => {
        setSequence((previous) => previous + 1)
      }, delay)

      return () => {
        window.clearInterval(interval)
      }
    }, [delay, childrenArray.length])

    const itemsToShow = useMemo(() => {
      if (childrenArray.length === 0) return []

      return Array.from(
        { length: Math.min(maxItems, childrenArray.length) },
        (_, offset) => {
          const itemSequence = sequence - offset
          const childIndex =
            ((itemSequence % childrenArray.length) + childrenArray.length) %
            childrenArray.length

          return {
            item: childrenArray[childIndex],
            key: `${(childrenArray[childIndex] as React.ReactElement).key}-${itemSequence}`,
          }
        }
      )
    }, [childrenArray, maxItems, sequence])

    return (
      <div
        className={cn(`flex flex-col items-center gap-4`, className)}
        {...props}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {itemsToShow.map(({ item, key }) => (
            <AnimatedListItem key={key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedList.displayName = "AnimatedList"
