import ServiceForm from "@/components/dashboard/service-form";
import { PageTitle } from "@/components/dashboard/dashboard-parts";

export const metadata = {
  title: "Add Service",
};

export default function AddServicePage() {
  return (
    <section>
      <PageTitle
        title="Add Service"
        text="New services stay pending until an admin approves them."
      />
      <ServiceForm />
    </section>
  );
}
