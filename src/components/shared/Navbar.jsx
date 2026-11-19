"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Browse Services" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8">
        <Logo className="text-[26px]" />

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[15px] transition-colors hover:text-brand",
                  isActive(link.href) ? "text-foreground" : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/sign-in"
              className="text-[15px] text-foreground/80 transition-colors hover:text-brand"
            >
              Sign In
            </Link>

            <Button asChild className="h-11 rounded-lg px-6 text-[15px]">
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </nav>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-background md:hidden">
          <nav
            className="mx-auto flex w-full max-w-[1280px] flex-col gap-1 px-5 py-4"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-[15px] transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive(link.href) ? "text-foreground" : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[15px] text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Sign In
            </Link>

            <Button asChild className="mt-2 h-11 w-full rounded-lg text-[15px]">
              <Link href="/sign-up" onClick={() => setOpen(false)}>
                Sign Up
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
