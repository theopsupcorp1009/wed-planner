"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { LoadingBlock, Message, PageTitle, StatusPill } from "@/components/dashboard/dashboard-parts";
import { api } from "@/lib/api";

export default function VendorBookingsPage() {
  const [bookings, setBookings] = useState(null);

  useEffect(() => {
    api("/vendor/bookings")
      .then(setBookings)
      .catch((err) => {
        toast.error(err.message);
        setBookings([]);
      });
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await api(`/vendor/bookings/${id}`, "PATCH", { status });
      setBookings(bookings.map((item) => (item._id === id ? { ...item, status } : item)));
      toast.success(`Booking request ${status}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section>
      <PageTitle title="Booking Requests" text="Accept or reject requests from customers." />

      {!bookings ? (
        <LoadingBlock rows={4} />
      ) : bookings.length === 0 ? (
        <Message text="No booking requests yet." />
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[960px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="px-5 py-4 font-normal">Customer</th>
                <th className="px-5 py-4 font-normal">Service</th>
                <th className="px-5 py-4 font-normal">Event date</th>
                <th className="px-5 py-4 font-normal">Event location</th>
                <th className="px-5 py-4 font-normal">Message</th>
                <th className="px-5 py-4 font-normal">Status</th>
                <th className="px-5 py-4 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-5 py-4">
                    <p className="font-medium text-foreground">{booking.customerName}</p>
                    <p className="text-xs text-muted-foreground">{booking.customerEmail}</p>
                  </td>
                  <td className="px-5 py-4 text-foreground">{booking.serviceName}</td>
                  <td className="px-5 py-4 text-muted-foreground">{booking.eventDate}</td>
                  <td className="px-5 py-4 text-muted-foreground">{booking.eventLocation}</td>
                  <td className="max-w-[220px] px-5 py-4 text-muted-foreground">
                    {booking.message || "-"}
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={booking.status} />
                  </td>
                  <td className="px-5 py-4">
                    {booking.status === "pending" ? (
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => handleStatus(booking._id, "accepted")}>
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatus(booking._id, "rejected")}
                        >
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
