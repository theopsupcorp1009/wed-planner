import Link from "next/link";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/guard";

export const metadata = {
  title: "Payment Cancelled",
};

export default async function PaymentCancelPage() {
  await requireRole("vendor");

  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <XCircle className="mx-auto size-12 text-destructive" aria-hidden="true" />
      <h1 className="mt-6 font-serif text-3xl font-semibold text-foreground">
        Payment cancelled
      </h1>
      <p className="mt-3 text-muted-foreground">
        No money was taken. You can upgrade to Premium whenever you are ready.
      </p>
      <Button asChild className="mt-8 h-11 rounded-lg px-6 text-[15px]">
        <Link href="/dashboard/vendor/subscription">Back to Subscription</Link>
      </Button>
    </section>
  );
}
