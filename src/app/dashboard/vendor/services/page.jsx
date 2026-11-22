"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { LoadingBlock, Message, PageTitle, StatusPill } from "@/components/dashboard/dashboard-parts";
import { api } from "@/lib/api";

export default function VendorServicesPage() {
  const [services, setServices] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    api("/vendor/services")
      .then(setServices)
      .catch((err) => {
        toast.error(err.message);
        setServices([]);
      });
  }, []);

  const handleToggle = async (service) => {
    const isActive = service.isActive === false;

    try {
      await api(`/vendor/services/${service._id}/availability`, "PATCH", { isActive });
      setServices(
        services.map((item) => (item._id === service._id ? { ...item, isActive } : item))
      );
      toast.success(isActive ? "Service is now available" : "Service is now unavailable");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api(`/vendor/services/${id}`, "DELETE");
      setServices(services.filter((item) => item._id !== id));
      toast.success("Service deleted");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setConfirmId(null);
    }
  };

  return (
    <section>
      <PageTitle title="My Services" text="Manage the services you offer to couples." />

      {!services ? (
        <LoadingBlock rows={4} />
      ) : services.length === 0 ? (
        <Message text="You have not added any services yet." />
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="px-5 py-4 font-normal">Service</th>
                <th className="px-5 py-4 font-normal">Category</th>
                <th className="px-5 py-4 font-normal">Price</th>
                <th className="px-5 py-4 font-normal">Approval</th>
                <th className="px-5 py-4 font-normal">Availability</th>
                <th className="px-5 py-4 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {services.map((service) => (
                <tr key={service._id}>
                  <td className="px-5 py-4 font-medium text-foreground">
                    <div className="flex items-center gap-3">
                      {service.images?.[0] ? (
                        <img
                          src={service.images[0]}
                          alt={service.serviceName}
                          className="size-10 rounded-lg object-cover"
                        />
                      ) : null}
                      {service.serviceName}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{service.category}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {Number(service.price).toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={service.status} />
                  </td>
                  <td className="px-5 py-4">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggle(service)}
                    >
                      {service.isActive === false ? "Unavailable" : "Available"}
                    </Button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Button asChild size="sm" variant="secondary">
                        <Link href={`/services/${service._id}`}>View</Link>
                      </Button>
                      <Button asChild size="sm" variant="secondary">
                        <Link href={`/dashboard/vendor/services/${service._id}`}>Edit</Link>
                      </Button>
                      {confirmId === service._id ? (
                        <>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(service._id)}
                          >
                            Confirm
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => setConfirmId(null)}
                          >
                            No
                          </Button>
                        </>
                      ) : (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => setConfirmId(service._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
