import { CalendarDays } from "lucide-react";

export const metadata = {
  title: "Booking Requests",
};

export default function VendorBookingsPage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Booking Requests
      </h1>
      <p className="mt-2 text-muted-foreground">
        Accept, decline or ask a couple for more details.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-14 text-center">
        <CalendarDays
          className="mx-auto size-8 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-4 font-medium text-foreground">
          No booking requests yet
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          New requests from couples will appear here.
        </p>
      </div>
    </section>
  );
}
