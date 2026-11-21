"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, Menu, Settings, X } from "lucide-react";
import { toast } from "react-toastify";
import { Logo } from "@/components/brand/logo";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { authClient, useSession } from "@/lib/auth-client";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Browse Services" },
];

/** Each role lands on its own dashboard. */
const DASHBOARD_BY_ROLE = {
  customer: "/dashboard/customer",
  vendor: "/dashboard/vendor",
  admin: "/dashboard/admin",
};

/** Rounded avatar — image when the user uploaded one, initials otherwise. */
function UserAvatar({ user, className }) {
  if (user?.image) {
  return (
    <Image
      src={user?.image}
      alt={user.name ? `${user.name} profile picture` : "Profile picture"}
      width={36}
      height={36}
      className={cn(
        "size-9 shrink-0 rounded-full border border-border object-cover",
        className
      )}
      unoptimized
    />
  );
}

  const initial = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-sm font-medium text-secondary-foreground",
        className
      )}
    >
      {initial}
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { data: session, isPending } = useSession();

  const user = session?.user;
  const dashboardHref = DASHBOARD_BY_ROLE[user?.role] || DASHBOARD_BY_ROLE.customer;
  const profileHref = `${dashboardHref}/settings`;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  // Close the profile popover on an outside click or Escape.
  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleSignOut = async () => {
    setMenuOpen(false);
    setOpen(false);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Could not log out. Please try again.");
        return;
      }

      toast.success("Logged out successfully!");

      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-transparent bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8">
        <Logo className="text-[26px]" />

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
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
          </nav>

          <ThemeToggle />

          {/* Account group — driven by the session */}
          {isPending ? (
            <div
              className="hidden size-9 animate-pulse rounded-full bg-muted lg:block"
              aria-hidden="true"
            />
          ) : user ? (
            <div ref={menuRef} className="relative hidden items-center gap-2 lg:flex">
              {/* Image button — opens the same profile popover */}
              <button
                type="button"
                onClick={() => setMenuOpen((value) => !value)}
                aria-label="Open profile menu"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-controls="profile-menu"
                className="rounded-full transition-opacity hover:opacity-80 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <UserAvatar user={user} />
              </button>

              {/* Profile button — opens the same profile popover */}
              <Button
                type="button"
                variant="outline"
                onClick={() => setMenuOpen((value) => !value)}
                aria-haspopup="menu"
                aria-expanded={menuOpen}
                aria-controls="profile-menu"
                className="h-10 rounded-lg px-4 text-[15px]"
              >
                Profile
              </Button>

              {menuOpen ? (
                <div
                  id="profile-menu"
                  className="absolute top-full right-0 z-50 mt-2 w-72 rounded-2xl border border-border bg-popover p-2 shadow-lg"
                >
                  {/* User name + profile image */}
                  <div className="flex items-center gap-3 px-3 py-2.5">
                    <UserAvatar user={user} />

                    <div className="min-w-0 leading-tight">
                      <Link
                        href={profileHref}
                        onClick={() => setMenuOpen(false)}
                        className="block truncate text-[15px] font-medium text-popover-foreground transition-colors hover:text-brand"
                      >
                        {user.name}
                      </Link>

                      <Link
                        href={profileHref}
                        onClick={() => setMenuOpen(false)}
                        className="mt-0.5 block truncate text-xs text-muted-foreground transition-colors hover:text-brand"
                      >
                        {user.email}
                      </Link>
                    </div>
                  </div>

                  <div className="my-1 border-t border-border" />

                  <Link
                    href={dashboardHref}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[15px] text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <LayoutDashboard className="size-4 shrink-0" aria-hidden="true" />
                    Dashboard
                  </Link>

                  <Link
                    href={profileHref}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[15px] text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Settings className="size-4 shrink-0" aria-hidden="true" />
                    Profile Settings
                  </Link>

                  <div className="my-1 border-t border-border" />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSignOut}
                    className="h-10 w-full rounded-lg text-[15px]"
                  >
                    <LogOut className="size-4" aria-hidden="true" />
                    Logout
                  </Button>
                </div>
              ) : null}
            </div>
          ) : (
            <div className="hidden items-center gap-4 lg:flex">
              <Link
                href="/sign-in"
                className="text-[15px] text-foreground/80 transition-colors hover:text-brand"
              >
                Sign In
              </Link>

              <Button asChild className="h-11 rounded-lg px-6 text-[15px]">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-border bg-background lg:hidden">
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

            <div className="mt-3 border-t border-border pt-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-3">
                    <UserAvatar user={user} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={dashboardHref}
                    onClick={() => setOpen(false)}
                    className="mt-2 block rounded-lg px-3 py-2.5 text-[15px] text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Dashboard
                  </Link>

                  <Link
                    href={profileHref}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-[15px] text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Profile Settings
                  </Link>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSignOut}
                    className="mt-2 h-11 w-full rounded-lg text-[15px]"
                  >
                    <LogOut className="size-4" aria-hidden="true" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-[15px] text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Sign In
                  </Link>

                  <Button asChild className="mt-2 h-11 w-full rounded-lg text-[15px]">
                    <Link href="/sign-up" onClick={() => setOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
