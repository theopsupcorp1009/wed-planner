import { Star } from "lucide-react";

export const metadata = {
  title: "Reviews",
};

export default function VendorReviewsPage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Reviews
      </h1>
      <p className="mt-2 text-muted-foreground">
        See what couples said after working with you.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-14 text-center">
        <Star
          className="mx-auto size-8 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-4 font-medium text-foreground">No reviews yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Reviews from completed bookings will appear here.
        </p>
      </div>
    </section>
  );
}
