import { CalendarDays, Heart, MessageSquare, Star } from "lucide-react";

export const metadata = {
  title: "Customer Overview",
};

const STATS = [
  { label: "Bookings", value: "0", icon: CalendarDays },
  { label: "Saved vendors", value: "0", icon: Heart },
  { label: "Messages", value: "0", icon: MessageSquare },
  { label: "Reviews written", value: "0", icon: Star },
];

export default function CustomerOverviewPage() {
  return (
    <section>
      <header>
        <p className="text-[13px] font-medium tracking-wide text-muted-foreground uppercase">
          Customer
        </p>
        <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Welcome back
        </h1>
        <p className="mt-2 text-muted-foreground">
          Here is what is happening with your wedding planning.
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
          Recent activity
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Your latest bookings and messages will show up here.
        </p>

        <div className="mt-6 rounded-xl border border-dashed border-border px-6 py-12 text-center">
          <p className="text-sm text-muted-foreground">Nothing to show yet.</p>
        </div>
      </div>
    </section>
  );
}
