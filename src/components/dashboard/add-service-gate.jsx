"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Crown } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { LoadingBlock } from "@/components/dashboard/dashboard-parts";
import ServiceForm from "@/components/dashboard/service-form";
import { api } from "@/lib/api";

/** Free vendors can keep this many active services. */
const FREE_SERVICE_LIMIT = 3;

/**
 * Shows the service form, or an upgrade notice once a free vendor has used
 * all three service slots.
 */
export default function AddServiceGate() {
  const [state, setState] = useState(null);

  useEffect(() => {
    Promise.all([api("/me"), api("/vendor/services")])
      .then(([me, services]) => setState({ me, services }))
      .catch((err) => {
        toast.error(err.message);
        setState({ me: null, services: [] });
      });
  }, []);

  if (!state) {
    return <LoadingBlock rows={5} />;
  }

  const used = state.services.filter(
    (service) => service.isActive !== false && service.status !== "rejected"
  ).length;

  const limitReached =
    state.me?.subscriptionPlan !== "premium" && used >= FREE_SERVICE_LIMIT;

  if (!limitReached) {
    return <ServiceForm />;
  }

  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <Crown className="size-6 text-brand" aria-hidden="true" />
      <h2 className="mt-4 font-serif text-2xl font-semibold text-foreground">
        You have reached the Free plan limit
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Free vendors can keep up to {FREE_SERVICE_LIMIT} active services. Upgrade to
        Premium to add more.
      </p>
      <Button asChild className="mt-6 h-11 rounded-lg px-6 text-[15px]">
        <Link href="/dashboard/vendor/subscription">View Premium plans</Link>
      </Button>
    </div>
  );
}
