import CustomerBookingsClient from "@/components/users/CustomerBooking";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "My Bookings",
};

export default async function CustomerBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const res = user?.email
    ? await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/my-bookings/${encodeURIComponent(user.email)}`,
        { cache: "no-store" }
      )
    : null;

  const data = res?.ok ? await res.json() : [];
  const bookings = Array.isArray(data) ? data : data.bookings || [];

  return <CustomerBookingsClient initialBookings={bookings} />;
}