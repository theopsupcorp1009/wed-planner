"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, Mail, Clock, X } from "lucide-react";

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "accepted":
      return "bg-emerald-100/90 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300";
    case "rejected":
      return "bg-rose-100/90 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300";
    case "cancelled":
      return "bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300";
    default:
      return "bg-amber-100/80 text-amber-700 dark:bg-[#332914] dark:text-[#e5be6b]";
  }
};

const formatDate = (value) => {
  if (!value) return "Not specified";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function CustomerBookingsClient({ initialBookings = [] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  const handleCancel = async (bookingId) => {
    setCancellingId(bookingId);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (res.ok) {
        setBookings((prev) =>
          prev.map((item) =>
            item._id === bookingId ? { ...item, status: "cancelled" } : item
          )
        );
        if (selectedBooking && selectedBooking._id === bookingId) {
          setSelectedBooking((prev) => ({ ...prev, status: "cancelled" }));
        }
      }
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <section>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">
            My bookings
          </h1>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            Track every request you have sent and every confirmed date.
          </p>
        </div>

        <Link
          href="/dashboard/customer/profile"
          className="rounded-full bg-[#f3e6ed] px-4 py-1.5 text-xs font-medium text-[#68324c] transition duration-200 hover:bg-[#e8d5e0] dark:bg-[#2a1b25] dark:text-[#e0a9c3] dark:hover:bg-[#362230]"
        >
          Profile
        </Link>
      </div>

      {bookings.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-stone-200/80 bg-white dark:border-[#2d1e29] dark:bg-[#191117]">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-stone-200/70 text-xs text-stone-500 dark:border-[#2a1c26] dark:text-stone-400">
                <th className="px-6 py-4 font-normal">Service</th>
                <th className="px-6 py-4 font-normal">Vendor</th>
                <th className="px-6 py-4 font-normal">Event date</th>
                <th className="px-6 py-4 font-normal">Status</th>
                <th className="px-6 py-4 font-normal">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200/60 text-xs dark:divide-[#261922]">
              {bookings.map((booking) => {
                const status = booking.status || "Pending";
                const isPending = status.toLowerCase() === "pending";
                const vendorLabel =
                  booking.vendorName ||
                  booking.creatorName ||
                  booking.creatorMail ||
                  "Vendor Name";

                return (
                  <tr
                    key={booking._id}
                    className="transition duration-150 hover:bg-[#faf4f7] dark:hover:bg-[#20151d]"
                  >
                    <td className="px-6 py-4 font-medium text-stone-900 dark:text-stone-100">
                      {booking.serviceName || "Wedding Service"}
                    </td>
                    <td className="px-6 py-4 text-stone-600 dark:text-stone-300">
                      {vendorLabel}
                    </td>
                    <td className="px-6 py-4 text-stone-600 dark:text-stone-300">
                      {formatDate(booking.eventDate)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium capitalize ${getStatusStyle(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {isPending ? (
                        <button
                          type="button"
                          onClick={() => handleCancel(booking._id)}
                          disabled={cancellingId === booking._id}
                          className="rounded-xl bg-[#f3e6ed] px-4 py-2 text-xs font-medium text-[#68324c] transition duration-200 hover:bg-[#68324c] hover:text-white disabled:opacity-60 dark:bg-[#291a24] dark:text-[#e0a9c3] dark:hover:bg-[#dfa4c0] dark:hover:text-[#160f14]"
                        >
                          {cancellingId === booking._id
                            ? "Cancelling..."
                            : "Cancel"}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedBooking(booking)}
                          className="text-xs font-medium text-stone-700 transition duration-200 hover:text-[#68324c] dark:text-stone-300 dark:hover:text-[#e6b3ca]"
                        >
                          View Details
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-2xl border border-stone-200/80 bg-white px-6 py-14 text-center dark:border-[#2d1e29] dark:bg-[#191117]">
          <CalendarDays
            className="mx-auto size-7 text-stone-400 dark:text-stone-500"
            aria-hidden="true"
          />
          <p className="mt-4 font-serif text-lg text-stone-900 dark:text-stone-100">
            No bookings yet
          </p>
          <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
            Once you book a vendor, it will appear here.
          </p>
        </div>
      )}

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-stone-200/80 bg-white p-6 dark:border-[#2d1e29] dark:bg-[#191117]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-medium capitalize ${getStatusStyle(
                    selectedBooking.status
                  )}`}
                >
                  {selectedBooking.status || "Pending"}
                </span>
                <h2 className="mt-2 font-serif text-2xl font-medium text-stone-900 dark:text-stone-100">
                  {selectedBooking.serviceName || "Wedding Service"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="rounded-lg p-1.5 text-stone-500 transition hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-[#261922] dark:hover:text-stone-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-3 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#68324c] dark:text-[#e0a9c3]" />
                <span>
                  Vendor Email:{" "}
                  <strong className="font-medium text-stone-900 dark:text-stone-100">
                    {selectedBooking.creatorMail || "Not available"}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CalendarDays className="h-4 w-4 text-[#68324c] dark:text-[#e0a9c3]" />
                <span>Event Date: {formatDate(selectedBooking.eventDate)}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#68324c] dark:text-[#e0a9c3]" />
                <span>
                  Event Location:{" "}
                  {selectedBooking.eventLocation || "Not specified"}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-[#68324c] dark:text-[#e0a9c3]" />
                <span>
                  Request Date: {formatDate(selectedBooking.createdAt)}
                </span>
              </div>
              {selectedBooking.message && (
                <div className="rounded-xl border border-stone-200/70 bg-stone-50 p-3 text-stone-700 dark:border-[#2a1c26] dark:bg-[#130c11] dark:text-stone-300">
                  <p className="mb-1 font-medium text-stone-900 dark:text-stone-100">
                    Your Message
                  </p>
                  <p>{selectedBooking.message}</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              {selectedBooking.serviceId && (
                <Link
                  href={`/services/${selectedBooking.serviceId}`}
                  className="rounded-xl border border-stone-200 px-4 py-2 text-xs font-medium text-stone-700 transition hover:bg-stone-50 dark:border-[#2d1e29] dark:text-stone-200 dark:hover:bg-[#22161f]"
                >
                  View Service Details
                </Link>
              )}
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="rounded-xl bg-[#68324c] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#53263c] dark:bg-[#dfa4c0] dark:text-[#160f14] dark:hover:bg-[#e8b8cf]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}