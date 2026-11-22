import PaymentSuccess from "@/components/payment/PaymentSuccess";
import { requireRole } from "@/lib/guard";

export const metadata = {
  title: "Payment Success",
};

export default async function PaymentSuccessPage() {
  await requireRole("vendor");
  return <PaymentSuccess />;
}
