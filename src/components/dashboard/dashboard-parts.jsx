import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function PageTitle({ title, text }) {
  return (
    <header>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-muted-foreground">{text}</p>
    </header>
  );
}

export function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Icon className="size-4 text-brand" aria-hidden="true" />
      </div>
      <p className="mt-3 font-serif text-3xl font-semibold capitalize text-foreground">
        {value}
      </p>
    </div>
  );
}

export function Message({ text }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-14 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}

/** Simple panel placeholder shown while a dashboard section is fetching. */
export function LoadingBlock({ rows = 3 }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-6" aria-hidden="true">
      <Skeleton className="h-5 w-40 rounded-md" />
      <div className="mt-5 space-y-3">
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton key={index} className="h-11 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

/** Placeholder for the stat-card grids on the overview pages. */
export function StatCardsSkeleton({ count = 4, className = "xl:grid-cols-4" }) {
  return (
    <div
      className={cn("mt-8 grid gap-4 sm:grid-cols-2", className)}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="h-[104px] rounded-2xl" />
      ))}
    </div>
  );
}

export function StatusPill({ status }) {
  const styles = {
    approved: "bg-success-bg text-success",
    accepted: "bg-success-bg text-success",
    paid: "bg-success-bg text-success",
    premium: "bg-success-bg text-success",
    pending: "bg-warning-bg text-warning",
    rejected: "bg-danger-bg text-danger",
    cancelled: "bg-danger-bg text-danger",
    blocked: "bg-danger-bg text-danger",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${
        styles[status] || "bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  );
}
