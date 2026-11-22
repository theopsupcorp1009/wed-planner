"use client";

import { useParams } from "next/navigation";
import ServiceForm from "@/components/dashboard/service-form";
import { PageTitle } from "@/components/dashboard/dashboard-parts";

export default function EditServicePage() {
  const { id } = useParams();

  return (
    <section>
      <PageTitle title="Edit Service" text="Update the details of your service." />
      <ServiceForm serviceId={id} />
    </section>
  );
}
