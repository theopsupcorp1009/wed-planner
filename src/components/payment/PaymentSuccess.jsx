"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";

const formatMoney = (amount, currency) => {
  if (amount === undefined || amount === null) return "—";

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: (currency || "usd").toUpperCase(),
    }).format(Number(amount));
  } catch {
    return `${Number(amount)} ${(currency || "").toUpperCase()}`;
  }
};

function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-right font-medium break-all text-foreground">{value}</dd>
    </div>
  );
}

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [premium, setPremium] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let tries = 0;
    let timer;

    const loadTransaction = async () => {
      try {
        const list = await api("/vendor/transactions");
        if (Array.isArray(list) && list.length > 0) {
          setTransaction(list[0]);
        }
      } catch {
        // Not fatal — the success message still shows.
      }
    };

    const check = async () => {
      tries++;

      try {
        // Confirming the Stripe session stores the transaction immediately,
        // so Premium is available without waiting for the webhook.
        if (sessionId) {
          const { transaction: saved } = await api("/payments/confirm", "POST", {
            sessionId,
          });
          if (saved) setTransaction(saved);
        }

        const me = await api("/me");

        if (me.subscriptionPlan === "premium" || me.premium === true) {
          setPremium(true);
          if (!sessionId) await loadTransaction();
          clearInterval(timer);
          setChecking(false);
          return;
        }
      } catch {
        // Keep retrying until the attempts run out.
      }

      if (tries >= 10) {
        clearInterval(timer);
        setChecking(false);
      }
    };

    check();
    timer = setInterval(check, 2000);

    return () => clearInterval(timer);
  }, [sessionId]);

  const createdAt = transaction?.createdAt ? new Date(transaction.createdAt) : null;

  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <CheckCircle className="mx-auto size-12 text-brand" aria-hidden="true" />
      <h1 className="mt-6 font-serif text-3xl font-semibold text-foreground">
        Payment received
      </h1>
      <p className="mt-3 text-muted-foreground">
        {premium
          ? "Your Premium plan is active. You can add unlimited services right away."
          : checking
            ? "We are confirming your payment with Stripe. This usually takes a few seconds."
            : "Your payment went through. If Premium is not active yet, it will update shortly."}
      </p>

      {transaction ? (
        <dl className="mt-8 space-y-3 rounded-2xl border border-border bg-card p-6 text-left text-sm">
          <DetailRow
            label="Transaction ID"
            value={transaction.stripeSessionId || transaction._id}
          />
          <DetailRow label="Name" value={transaction.vendorName || "—"} />
          <DetailRow label="Email" value={transaction.vendorEmail || "—"} />
          <DetailRow label="Plan" value={transaction.plan || "premium"} />
          <DetailRow
            label="Amount"
            value={formatMoney(transaction.amount, transaction.currency)}
          />
          <DetailRow
            label="Date"
            value={
              createdAt
                ? createdAt.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "—"
            }
          />
          <DetailRow
            label="Time"
            value={createdAt ? createdAt.toLocaleTimeString("en-GB") : "—"}
          />
          <DetailRow label="Status" value={transaction.status || "paid"} />
        </dl>
      ) : checking ? (
        <div className="mt-8 space-y-3 rounded-2xl border border-border bg-card p-6" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((item) => (
            <Skeleton key={item} className="h-5 w-full rounded-md" />
          ))}
        </div>
      ) : null}

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild className="h-11 rounded-lg px-6 text-[15px]">
          <Link href="/dashboard/vendor/services">Go to My Services</Link>
        </Button>
        <Button asChild variant="outline" className="h-11 rounded-lg px-6 text-[15px]">
          <Link href="/dashboard/vendor/subscription">View Subscription</Link>
        </Button>
      </div>
    </section>
  );
}
