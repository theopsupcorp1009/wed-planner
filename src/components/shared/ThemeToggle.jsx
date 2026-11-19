"use client";

import { useLayoutEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Light/dark switch.
 * The icon is driven by CSS (sun in light, moon in dark) so there is no
 * hydration mismatch — the button renders identically on the server.
 */
export default function ThemeToggle({ className }) {
  // Re-apply the stored theme after React's dev remount clears the attribute.
  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        document.documentElement.setAttribute("data-theme", stored);
      }
    } catch {
      /* localStorage unavailable — keep the server default */
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", next);

    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Toggle color theme"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        "focus-visible:ring-[3px] focus-visible:ring-ring/30 focus-visible:outline-none",
        className
      )}
    >
      <Sun className="size-[18px] dark:hidden" aria-hidden="true" />
      <Moon className="hidden size-[18px] dark:block" aria-hidden="true" />
    </button>
  );
}
