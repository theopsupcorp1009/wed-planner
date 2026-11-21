import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata = {
  title: "Customer Dashboard",
};

export default function CustomerDashboardLayout({ children }) {
  return <DashboardShell role="customer">{children}</DashboardShell>;
}
