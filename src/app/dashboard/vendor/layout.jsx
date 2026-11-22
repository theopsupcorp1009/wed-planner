import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireRole } from "@/lib/guard";

export const metadata = {
  title: "Vendor Dashboard",
};

export default async function VendorDashboardLayout({ children }) {
  await requireRole("vendor");
  return <DashboardShell role="vendor">{children}</DashboardShell>;
}
