import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { requireRole } from "@/lib/guard";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardLayout({ children }) {
  await requireRole("admin");
  return <DashboardShell role="admin">{children}</DashboardShell>;
}
