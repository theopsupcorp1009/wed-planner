import { CreditCard } from "lucide-react";

export const metadata = {
  title: "Payments",
};

export default function AdminPaymentsPage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Payments
      </h1>
      <p className="mt-2 text-muted-foreground">
        Track premium subscriptions and vendor payouts.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-14 text-center">
        <CreditCard
          className="mx-auto size-8 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-4 font-medium text-foreground">No payments yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Stripe transactions will appear here.
        </p>
      </div>
    </section>
  );
}
