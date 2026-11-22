"use client";

import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle, Clock, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { api } from "@/lib/api";
import { Message, PageTitle, StatCard } from "@/components/dashboard/dashboard-parts";

export default function CustomerOverviewPage() {
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    api("/customer/bookings")
      .then(setBookings)
      .catch((err) => {
        toast.error(err.message);
        setBookings([]);
      });
  }, []);

  if (!bookings) {
    return <Message text="Loading dashboard..." />;
  }

  const countOf = (status) => bookings.filter((b) => b.status === status).length;

  return (
    <section>
      <PageTitle title="Welcome back" text="Here is what is happening with your booking requests." />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total requests" value={bookings.length} icon={CalendarDays} />
        <StatCard label="Pending" value={countOf("pending")} icon={Clock} />
        <StatCard label="Accepted" value={countOf("accepted")} icon={CheckCircle} />
        <StatCard label="Rejected" value={countOf("rejected")} icon={XCircle} />
      </div>
    </section>
  );
}
