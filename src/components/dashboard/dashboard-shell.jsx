"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  Menu,
  Plus,
  Receipt,
  Settings,
  Store,
  Users,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Navigation for the three dashboards.
 * It lives here (inside the client component) because icon components cannot be
 * passed from a server layout to a client component.
 */
const DASHBOARDS = {
  customer: {
    label: "Customer",
    description: "Your wedding planning hub",
    basePath: "/dashboard/customer",
    links: [
      { href: "/dashboard/customer", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/customer/bookings", label: "My Bookings", icon: CalendarDays },
      { href: "/dashboard/customer/settings", label: "Profile Settings", icon: Settings },
    ],
  },
  vendor: {
    label: "Vendor",
    description: "Your studio at a glance",
    basePath: "/dashboard/vendor",
    links: [
      { href: "/dashboard/vendor", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/vendor/services", label: "My Services", icon: Store },
      { href: "/dashboard/vendor/add-service", label: "Add Service", icon: Plus },
      { href: "/dashboard/vendor/bookings", label: "Booking Requests", icon: CalendarDays },
      { href: "/dashboard/vendor/subscription", label: "Subscription", icon: CreditCard },
      { href: "/dashboard/vendor/settings", label: "Profile Settings", icon: Settings },
    ],
  },
  admin: {
    label: "Admin",
    description: "Platform overview",
    basePath: "/dashboard/admin",
    links: [
      { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
      { href: "/dashboard/admin/users", label: "Manage Users", icon: Users },
      { href: "/dashboard/admin/services", label: "Manage Services", icon: Store },
      { href: "/dashboard/admin/transactions", label: "Transactions", icon: Receipt },
      { href: "/dashboard/admin/settings", label: "Profile Settings", icon: Settings },
    ],
  },
};

/**
 * Dashboard frame shared by the three dashboards.
 * The role picks the navigation, so each area stays different while the
 * behaviour (active link, mobile drawer) stays the same.
 */
export function DashboardShell({ role, children }) {
  const { label, description, basePath, links } = DASHBOARDS[role];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The overview link matches exactly; the others also match their child routes.
  const isActive = (href) =>
    href === basePath ? pathname === href : pathname?.startsWith(href);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
      <div className="lg:grid lg:grid-cols-[264px_minmax(0,1fr)] lg:items-start lg:gap-8">
        {/* Mobile bar */}
        <div className="mb-6 flex items-center justify-between gap-4 lg:hidden">
          <div>
            <p className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              {label}
            </p>
            <p className="mt-0.5 text-sm text-foreground">{description}</p>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="dashboard-nav"
            aria-label={open ? "Close dashboard menu" : "Open dashboard menu"}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-border px-3 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
            Menu
          </button>
        </div>

        {/* Sidebar */}
        <aside
          id="dashboard-nav"
          className={cn("lg:sticky lg:top-24 lg:block", open ? "block" : "hidden")}
        >
          <div className="rounded-2xl border border-border bg-card p-3">
            <p className="px-3 pt-2 pb-3 text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
              {label}
            </p>

            <nav aria-label={`${label} navigation`} className="flex flex-col gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-colors",
                      active
                        ? "bg-secondary font-medium text-secondary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="size-[18px] shrink-0" aria-hidden="true" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-3 border-t border-border pt-3">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <ArrowLeft className="size-[18px] shrink-0" aria-hidden="true" />
                Back to site
              </Link>
            </div>
          </div>
        </aside>

        {/* Page content */}
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
