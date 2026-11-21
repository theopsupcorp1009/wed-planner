import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardLayout({ children }) {
  return <DashboardShell role="admin">{children}</DashboardShell>;
}
