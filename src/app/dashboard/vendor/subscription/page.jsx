"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { LoadingBlock, PageTitle } from "@/components/dashboard/dashboard-parts";
import { api } from "@/lib/api";

const FREE_FEATURES = [
  "Maximum 3 active services",
  "Basic vendor dashboard",
  "Booking request management",
];

const PREMIUM_FEATURES = [
  "Unlimited active services",
  "Premium vendor badge",
  "All Free plan features",
];

function PlanCard({ title, price, features, current, children }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-serif text-2xl font-semibold text-foreground">{title}</h2>
        {current ? (
          <span className="rounded-full bg-success-bg px-3 py-1 text-xs font-medium text-success">
            Current plan
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-muted-foreground">{price}</p>

      <ul className="mt-6 space-y-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
            <Check className="size-4 text-brand" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6">{children}</div>
    </div>
  );
}

export default function VendorSubscriptionPage() {
  const [me, setMe] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    api("/me")
      .then(setMe)
      .catch((err) => toast.error(err.message));
  }, []);

  const handleUpgrade = async () => {
    setRedirecting(true);

    try {
      const { url } = await api("/payments/create-checkout-session", "POST");
      window.location.href = url;
    } catch (err) {
      toast.error(err.message);
      setRedirecting(false);
    }
  };

  if (!me) {
    return (
      <section>
        <PageTitle title="Subscription" text="Choose the plan that fits your business." />
        <LoadingBlock rows={3} />
      </section>
    );
  }

  const isPremium = me.subscriptionPlan === "premium";

  return (
    <section>
      <PageTitle title="Subscription" text="Choose the plan that fits your business." />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <PlanCard title="Free" price="$0 / month" features={FREE_FEATURES} current={!isPremium} />

        <PlanCard title="Premium" price="Unlimited services" features={PREMIUM_FEATURES} current={isPremium}>
          {isPremium ? (
            <p className="text-sm text-muted-foreground">
              Active until {new Date(me.subscriptionExpiresAt).toLocaleDateString("en-GB")}
            </p>
          ) : (
            <Button
              onClick={handleUpgrade}
              disabled={redirecting}
              className="h-11 w-full rounded-lg text-[15px]"
            >
              {redirecting ? "Redirecting to Stripe..." : "Upgrade to Premium"}
            </Button>
          )}
        </PlanCard>
      </div>
    </section>
  );
}
