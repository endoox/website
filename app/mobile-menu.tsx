"use client";

import type { CSSProperties } from "react";
import { DEMO_URL } from "@/lib/contact";
import { NAV_LINKS } from "@/lib/nav";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";


type MenuPhase = "closed" | "open" | "closing";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  );
}

export function MobileMenu() {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<MenuPhase>("closed");
  const isOpen = phase === "open";

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    clearCloseTimer();
    setPhase("open");
  }, [clearCloseTimer]);

  const closeMenu = useCallback(
    (restoreFocus = false) => {
      if (phase !== "open") {
        return;
      }

      clearCloseTimer();
      const rawDuration = getComputedStyle(
        document.documentElement,
      ).getPropertyValue("--dropdown-close-dur");
      const closeDuration = Number.parseFloat(rawDuration) || 150;

      setPhase("closing");
      closeTimerRef.current = window.setTimeout(() => {
        setPhase("closed");
        closeTimerRef.current = null;

        if (restoreFocus) {
          triggerRef.current?.focus();
        }
      }, closeDuration);
    },
    [clearCloseTimer, phase],
  );

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        isOpen &&
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeMenu(true);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, isOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 761px)");

    const closeAtDesktop = () => {
      if (desktopQuery.matches) {
        clearCloseTimer();
        setPhase("closed");
      }
    };

    desktopQuery.addEventListener("change", closeAtDesktop);

    return () => {
      desktopQuery.removeEventListener("change", closeAtDesktop);
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  return (
    <div ref={rootRef} className={styles.mobileMenu}>
      <button
        ref={triggerRef}
        className={styles.mobileMenuTrigger}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={toggleMenu}
      >
        <span>{isOpen ? "Close" : "Menu"}</span>
        <span
          className={styles.mobileMenuIcon}
          data-open={isOpen ? "true" : "false"}
          aria-hidden="true"
        >
          <i />
          <i />
        </span>
      </button>

      <div
        id="mobile-navigation"
        className={`${styles.mobileMenuPanel} t-dropdown ${phase === "open" ? "is-open" : ""} ${phase === "closing" ? "is-closing" : ""}`}
        data-origin="top-right"
        data-state={phase}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <nav className={styles.mobileMenuNav} aria-label="Mobile navigation">
          {NAV_LINKS.map((link, index) => (
            <a
              className={styles.mobileMenuLink}
              style={
                {
                  "--mobile-menu-delay": `${50 + index * 38}ms`,
                } as CSSProperties
              }
              href={link.href}
              onClick={() => closeMenu()}
              key={link.label}
            >
              <strong>{link.label}</strong>
            </a>
          ))}
        </nav>

        <a
          className={styles.mobileMenuDemo}
          href={DEMO_URL}
          onClick={() => closeMenu()}
        >
          <span>Request a demo</span>
          <span className={styles.mobileMenuDemoArrow} aria-hidden="true">
            <ArrowIcon />
          </span>
        </a>
      </div>
    </div>
  );
}
