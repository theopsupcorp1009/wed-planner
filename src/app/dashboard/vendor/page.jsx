"use client";

import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle, Clock, Crown, Store } from "lucide-react";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import { Message, PageTitle, StatCard } from "@/components/dashboard/dashboard-parts";

export default function VendorOverviewPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([api("/vendor/services"), api("/vendor/bookings"), api("/me")])
      .then(([services, bookings, me]) => setData({ services, bookings, me }))
      .catch((err) => toast.error(err.message));
  }, []);

  if (!data) {
    return <Message text="Loading dashboard..." />;
  }

  const { services, bookings, me } = data;
  const activeServices = services.filter(
    (service) => service.status === "approved" && service.isActive !== false
  );
  const pendingBookings = bookings.filter((booking) => booking.status === "pending");
  const acceptedBookings = bookings.filter((booking) => booking.status === "accepted");

  return (
    <section>
      <PageTitle title="Your business at a glance" text="Keep your services fresh and answer requests quickly." />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total services" value={services.length} icon={Store} />
        <StatCard label="Active services" value={activeServices.length} icon={CheckCircle} />
        <StatCard label="Pending booking requests" value={pendingBookings.length} icon={Clock} />
        <StatCard label="Accepted bookings" value={acceptedBookings.length} icon={CalendarDays} />
        <StatCard label="Current plan" value={me.subscriptionPlan || "free"} icon={Crown} />
      </div>
    </section>
  );
}
