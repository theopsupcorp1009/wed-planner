import { CalendarDays, Star, Store, Wallet } from "lucide-react";

export const metadata = {
  title: "Vendor Overview",
};

const STATS = [
  { label: "Services", value: "0", icon: Store },
  { label: "Booking requests", value: "0", icon: CalendarDays },
  { label: "Reviews", value: "0", icon: Star },
  { label: "Earnings", value: "$0", icon: Wallet },
];

export default function VendorOverviewPage() {
  return (
    <section>
      <header>
        <p className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
          Vendor
        </p>
        <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Your business at a glance
        </h1>
        <p className="mt-2 text-muted-foreground">
          Keep your services fresh and answer requests quickly.
        </p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">{label}</p>
              <Icon className="size-4 text-brand" aria-hidden="true" />
            </div>
            <p className="mt-3 font-serif text-3xl font-semibold text-foreground">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-serif text-xl font-semibold text-foreground">
          New requests
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Couples waiting for your reply will show up here.
        </p>

        <div className="mt-6 rounded-xl border border-dashed border-border px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">Nothing to show yet.</p>
        </div>
      </div>
    </section>
  );
}
