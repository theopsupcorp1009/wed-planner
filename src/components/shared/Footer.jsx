import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Browse Services" },
  { href: "/sign-in", label: "Sign In" },
  { href: "/sign-up", label: "Sign Up" },
];

const CONTACT_LINKS = [
  { href: "mailto:hello@wedplan.com", label: "hello@wedplan.com", icon: Mail },
  { href: "tel:+15551234567", label: "+1 (555) 123-4567", icon: Phone },
  {
    href: "https://maps.google.com/?q=New+York",
    label: "123 Rosewood Lane, New York, NY",
    icon: MapPin,
  },
];

const SOCIAL_LINKS = [
  { href: "https://instagram.com", label: "Instagram" },
  { href: "https://facebook.com", label: "Facebook" },
  { href: "https://twitter.com", label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-footer text-footer-foreground dark:border-transparent">
      <div className="mx-auto w-full max-w-[1280px] px-5 py-14 sm:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr] lg:gap-12">
          {/* Logo, short description, social media */}
          <div className="max-w-sm">
            <Logo className="text-2xl text-brand" />

            <p className="mt-4 text-sm leading-relaxed text-footer-muted">
              Discover trusted wedding vendors, compare packages and book with
              confidence — all in one calm place.
            </p>

            <ul className="mt-6 flex flex-wrap items-center gap-2" aria-label="Social media">
              {SOCIAL_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-footer-foreground/20 px-3 py-1.5 text-[13px] text-footer-muted transition-colors hover:border-footer-foreground/40 hover:text-footer-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Important navigation links */}
          <nav aria-label="Footer">
            <h2 className="text-[15px] font-medium">Navigation</h2>

            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
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

          {/* Contact information */}
          <div>
            <h2 className="text-[15px] font-medium">Contact</h2>

            <ul className="mt-4 space-y-3">
              {CONTACT_LINKS.map(({ href, label, icon: Icon }) => (
                <li key={label} className="flex items-start gap-3">
                  <Icon
                    className="mt-0.5 size-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                  <a
                    href={href}
                    className="text-sm text-footer-muted transition-colors hover:text-footer-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-footer-foreground/10 pt-6">
          <p className="text-sm text-footer-muted">
            © {new Date().getFullYear()} WedPlan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
