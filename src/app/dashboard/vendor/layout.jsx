import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata = {
  title: "Vendor Dashboard",
};

export default function VendorDashboardLayout({ children }) {
  return <DashboardShell role="vendor">{children}</DashboardShell>;
}
