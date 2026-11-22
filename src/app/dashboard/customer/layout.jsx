import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireRole } from "@/lib/guard";

export const metadata = {
  title: "Customer Dashboard",
};

export default async function CustomerDashboardLayout({ children }) {
  await requireRole("customer");
  return <DashboardShell role="customer">{children}</DashboardShell>;
}
