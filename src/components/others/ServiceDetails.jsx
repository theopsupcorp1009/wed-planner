"use client";

import { authClient, useSession } from "@/lib/auth-client";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ServiceDetailsClient = ({ service }) => {
  const gallery =
    Array.isArray(service?.images) && service.images.length > 0
      ? service.images
      : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const thumbnails = gallery.slice(0, 3);
  const mainImage = gallery[activeIndex] || gallery[0] || "";
  const vendorName =
    service?.creatorName || service?.vendorName || "Vendor Name";
  const isPremium = Boolean(
    service?.isPremiumVendor ||
    service?.subscriptionPlan === "premium" ||
    service?.vendor?.subscriptionPlan === "premium",
  );

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  console.log(user);

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventDate || !eventLocation.trim()) {
      toast.error("Please provide both an event date and event location.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            serviceId: service._id,
            serviceName: service.serviceName,
            category: service.category,
            vendorId: service.vendorId,
            vendorName: service.creatorName,
            creatorMail: service.creatorMail,
            customerName: user.name,
            customerEmail: user.email,
            eventDate,
            eventLocation: eventLocation.trim(),
            createdAt: new Date(),
            message: message.trim(),
          }),
        },
      );

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "Could not submit booking request.");
        return;
      }

      toast.success("Booking request sent successfully.");
      setEventDate("");
      setEventLocation("");
      setMessage("");
    } catch {
      toast.error("Network error while sending booking request.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl border border-stone-200/80 bg-[#e7d6e0] dark:border-[#2d1e29] dark:bg-[#2c1c26]">
            {mainImage && (
              <img
                src={mainImage}
                alt={service.serviceName}
                className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
              />
            )}
          </div>

          {thumbnails.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {thumbnails.map((imgUrl, idx) => (
                <button
                  key={`${imgUrl}-${idx}`}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`aspect-[16/10] overflow-hidden rounded-xl border bg-[#e6d5bc] transition duration-200 hover:-translate-y-0.5 dark:bg-[#383322] ${
                    activeIndex === idx
                      ? "border-[#68324c] ring-2 ring-[#68324c]/30 dark:border-[#dfa4c0] dark:ring-[#dfa4c0]/30"
                      : "border-stone-200/80 opacity-85 hover:opacity-100 dark:border-[#2d1e29]"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${service.serviceName} ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="mt-6">
            <span className="inline-block rounded-md bg-[#f5ebf0] px-2.5 py-0.5 text-[11px] font-medium text-[#68324c] dark:bg-[#2a1a24] dark:text-[#e0a9c3]">
              {service.category}
            </span>
            <h1 className="mt-3 font-serif text-3xl font-medium tracking-tight text-stone-900 dark:text-stone-100 sm:text-4xl">
              {service.serviceName}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
              {service.description}
            </p>

            <div className="mt-5 rounded-xl border border-stone-200/80 bg-white px-4 py-3 text-xs text-stone-700 transition duration-200 hover:border-[#68324c]/40 dark:border-[#2d1e29] dark:bg-[#191117] dark:text-stone-300 dark:hover:border-[#d89bb8]/40">
              Vendor:{" "}
              <span className="font-medium text-stone-900 dark:text-stone-100">
                {vendorName}
              </span>
              {isPremium && (
                <span className="text-stone-500 dark:text-stone-400">
                  {" "}
                  · Premium badge
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-stone-200/80 bg-white p-6 transition duration-200 hover:border-[#68324c]/30 dark:border-[#2d1e29] dark:bg-[#191117] dark:hover:border-[#d89bb8]/30">
            <div className="mb-5 flex items-baseline gap-2">
              <span className="font-serif text-2xl font-semibold text-stone-900 dark:text-stone-100">
                ৳{Number(service.price).toLocaleString()}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {service.location}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-stone-700 dark:text-stone-300">
                  Event date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#68324c] focus:outline-none dark:border-[#2d1e29] dark:bg-[#130c11] dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-[#dfa4c0]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-stone-700 dark:text-stone-300">
                  Event location
                </label>
                <input
                  type="text"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  placeholder="Enter event location"
                  required
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#68324c] focus:outline-none dark:border-[#2d1e29] dark:bg-[#130c11] dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-[#dfa4c0]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-stone-700 dark:text-stone-300">
                  Additional message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share event details or questions..."
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-[#68324c] focus:outline-none dark:border-[#2d1e29] dark:bg-[#130c11] dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-[#dfa4c0]"
                />
              </div>

              {feedback && (
                <p
                  className={`text-xs ${
                    feedback.type === "error"
                      ? "text-red-600 dark:text-red-400"
                      : "text-emerald-700 dark:text-emerald-400"
                  }`}
                >
                  {feedback.text}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-[#68324c] px-4 py-3 text-xs font-medium text-white transition duration-200 hover:bg-[#53263c] disabled:opacity-60 dark:bg-[#dfa4c0] dark:text-[#160f14] dark:hover:bg-[#e8b8cf]"
              >
                {submitting ? "Sending..." : "Send Booking Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDetailsClient;
