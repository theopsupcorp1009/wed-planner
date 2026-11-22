import ProfileForm from "@/components/dashboard/profile-form";
import { PageTitle } from "@/components/dashboard/dashboard-parts";

export const metadata = {
  title: "Profile Settings",
};

export default function VendorSettingsPage() {
  return (
    <section>
      <PageTitle title="Profile Settings" text="Update your profile and business details." />
      <ProfileForm isVendor={true} />
    </section>
  );
}
