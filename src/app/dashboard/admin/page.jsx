"use client";

import { useEffect, useState } from "react";
import { Clock, Receipt, Store, UserCheck, Users, UserRound } from "lucide-react";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import { PageTitle, StatCard, StatCardsSkeleton } from "@/components/dashboard/dashboard-parts";

export default function AdminOverviewPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([api("/admin/users"), api("/admin/services"), api("/admin/transactions")])
      .then(([users, services, transactions]) => setData({ users, services, transactions }))
      .catch((err) => toast.error(err.message));
  }, []);

  if (!data) {
    return (
      <section>
        <PageTitle
          title="Platform overview"
          text="Everything happening across WedPlan in one place."
        />
        <StatCardsSkeleton count={6} className="xl:grid-cols-3" />
      </section>
    );
  }

  const { users, services, transactions } = data;

  return (
    <section>
      <PageTitle title="Platform overview" text="Everything happening across WedPlan in one place." />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Registered users" value={users.length} icon={Users} />
        <StatCard
          label="Vendors"
          value={users.filter((user) => user.role === "vendor").length}
          icon={UserCheck}
        />
        <StatCard
          label="Customers"
          value={users.filter((user) => user.role === "customer").length}
          icon={UserRound}
        />
        <StatCard label="Total services" value={services.length} icon={Store} />
        <StatCard
          label="Pending services"
          value={services.filter((service) => service.status === "pending").length}
          icon={Clock}
        />
        <StatCard label="Transactions" value={transactions.length} icon={Receipt} />
      </div>
    </section>
  );
}
