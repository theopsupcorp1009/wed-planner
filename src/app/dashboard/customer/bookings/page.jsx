import { CalendarDays } from "lucide-react";

export const metadata = {
  title: "My Bookings",
};

export default function CustomerBookingsPage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        My Bookings
      </h1>
      <p className="mt-2 text-muted-foreground">
        Track every request you have sent and every confirmed date.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-14 text-center">
        <CalendarDays
          className="mx-auto size-8 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-4 font-medium text-foreground">No bookings yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Once you book a vendor, it will appear here.
        </p>
      </div>
    </section>
  );
}
