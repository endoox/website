"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const FLOAT_AT = 56;
const RESET_AT = 12;

export function FloatingHeader({ children }: { children: ReactNode }) {
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      setIsFloating((current) =>
        current ? window.scrollY > RESET_AT : window.scrollY > FLOAT_AT,
      );
      frame = 0;
    };

    const handleScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <div className={styles.headerDock}>
      <header className={styles.header} data-floating={isFloating ? "true" : "false"}>
        {children}
      </header>
    </div>
  );
}
