"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message, PageTitle, StatusPill } from "@/components/dashboard/dashboard-parts";
import { api } from "@/lib/api";

export default function AdminServicesPage() {
  const [services, setServices] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    api("/admin/services")
      .then(setServices)
      .catch((err) => {
        toast.error(err.message);
        setServices([]);
      });
  }, []);

  const handleStatus = async (id, status) => {
    try {
      await api(`/admin/services/${id}`, "PATCH", { status });
      setServices(services.map((item) => (item._id === id ? { ...item, status } : item)));
      toast.success(`Service ${status}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api(`/admin/services/${id}`, "DELETE");
      setServices(services.filter((item) => item._id !== id));
      toast.success("Service deleted");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setConfirmId(null);
    }
  };

  const filteredServices = services
    ? services.filter((service) => {
        const text = `${service.serviceName} ${service.creatorName}`.toLowerCase();
        return (
          text.includes(search.toLowerCase()) && (!statusFilter || service.status === statusFilter)
        );
      })
    : [];

  return (
    <section>
      <PageTitle title="Manage Services" text="Review, approve and remove vendor services." />

      <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_200px]">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by service or vendor name"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-[52px] rounded-xl border border-input bg-card px-4 text-[15px] text-foreground outline-none"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {!services ? (
        <Message text="Loading services..." />
      ) : filteredServices.length === 0 ? (
        <Message text="No services found." />
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="px-5 py-4 font-normal">Service</th>
                <th className="px-5 py-4 font-normal">Vendor</th>
                <th className="px-5 py-4 font-normal">Category</th>
                <th className="px-5 py-4 font-normal">Price</th>
                <th className="px-5 py-4 font-normal">Status</th>
                <th className="px-5 py-4 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredServices.map((service) => (
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
                  <td className="px-5 py-4 text-muted-foreground">{service.creatorName}</td>
                  <td className="px-5 py-4 text-muted-foreground">{service.category}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {Number(service.price).toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={service.status} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {service.status !== "approved" ? (
                        <Button size="sm" onClick={() => handleStatus(service._id, "approved")}>
                          Approve
                        </Button>
                      ) : null}
                      {service.status !== "rejected" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatus(service._id, "rejected")}
                        >
                          Reject
                        </Button>
                      ) : null}
                      {confirmId === service._id ? (
                        <>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(service._id)}
                          >
                            Confirm
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setConfirmId(null)}>
                            No
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="secondary" onClick={() => setConfirmId(service._id)}>
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
