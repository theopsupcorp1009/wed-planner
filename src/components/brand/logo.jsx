import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ href = "/", className }) {
  return (
    <Link
      href={href}
      aria-label="WedPlan home"
      className={cn(
        "font-serif font-semibold tracking-tight text-brand transition-opacity hover:opacity-80",
        className
      )}
    >
      WedPlan
    </Link>
  );
}
