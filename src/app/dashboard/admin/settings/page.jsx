import ProfileForm from "@/components/dashboard/profile-form";
import { PageTitle } from "@/components/dashboard/dashboard-parts";

export const metadata = {
  title: "Profile Settings",
};

export default function AdminSettingsPage() {
  return (
    <section>
      <PageTitle title="Profile Settings" text="Update your name and profile image." />
      <ProfileForm isVendor={false} />
    </section>
  );
}
