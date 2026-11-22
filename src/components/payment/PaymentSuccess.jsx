"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

export default function PaymentSuccess() {
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    let tries = 0;

    const check = async () => {
      tries++;
      const me = await api("/me");

      if (me.subscriptionPlan === "premium") {
        setPremium(true);
        clearInterval(timer);
      } else if (tries >= 10) {
        clearInterval(timer);
      }
    };

    const timer = setInterval(check, 2000);
    check();

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <CheckCircle className="mx-auto size-12 text-brand" aria-hidden="true" />
      <h1 className="mt-6 font-serif text-3xl font-semibold text-foreground">
        Payment received
      </h1>
      <p className="mt-3 text-muted-foreground">
        {premium
          ? "Your Premium plan is active. You can now publish unlimited services."
          : "Thank you! We are confirming your payment. Premium will activate in a few seconds."}
      </p>
      <Button asChild className="mt-8 h-11 rounded-lg px-6 text-[15px]">
        <Link href="/dashboard/vendor/subscription">Go to Subscription</Link>
      </Button>
    </section>
  );
}
