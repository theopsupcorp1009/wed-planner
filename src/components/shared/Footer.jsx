import Link from "next/link";
import { Logo } from "@/components/brand/logo";

const EXPLORE_LINKS = [
  { href: "/services", label: "Browse Services" },
  { href: "/services#categories", label: "Categories" },
];

const CONTACT_LINKS = [
  { href: "mailto:hello@wedplan.com", label: "hello@wedplan.com" },
  { href: "#", label: "[YOUR PHONE]" },
];

const SOCIAL_LINKS = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-footer text-footer-foreground dark:border-transparent">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-14 sm:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
          <div className="max-w-xs">
            <Logo className="text-2xl text-brand" />
            <p className="mt-4 text-sm leading-relaxed text-footer-muted">
              Discover trusted wedding vendors and book with confidence.
            </p>
          </div>

          <nav aria-label="Explore">
            <h2 className="text-[15px] font-medium">Explore</h2>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-footer-muted transition-colors hover:text-footer-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[15px] font-medium">Contact</h2>
            <ul className="mt-4 space-y-2.5">
              {CONTACT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-footer-muted transition-colors hover:text-footer-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[15px] font-medium">Follow</h2>
            <ul className="mt-4 space-y-2.5">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-footer-muted transition-colors hover:text-footer-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 text-sm text-footer-muted">© 2026 WedPlan</p>
      </div>
    </footer>
  );
}
