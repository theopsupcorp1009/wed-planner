"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Message } from "@/components/dashboard/dashboard-parts";
import { api } from "@/lib/api";
import { uploadImage } from "@/lib/uploadImage";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL;

export default function ServiceForm({ serviceId }) {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [service, setService] = useState(undefined);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${SERVER}/categories`)
      .then((res) => res.json())
      .then(setCategories);

    if (serviceId) {
      fetch(`${SERVER}/services/${serviceId}`)
        .then((res) => res.json())
        .then(setService);
    }
  }, [serviceId]);

  if (serviceId && service === undefined) {
    return <Message text="Loading service..." />;
  }

  if (serviceId && service === null) {
    return <Message text="Service not found." />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const form = new FormData(e.target);
      const files = form.getAll("images").filter((file) => file.size > 0);
      let images = service?.images || [];

      if (files.length > 0) {
        images = await Promise.all(files.slice(0, 3).map(uploadImage));
      }
      if (images.length === 0) {
        throw new Error("Please upload at least one service image");
      }

      const body = {
        serviceName: form.get("serviceName").trim(),
        category: form.get("category"),
        description: form.get("description").trim(),
        price: form.get("price"),
        purchaseCount: service?.purchaseCount ?? 0,
        location: form.get("location").trim(),
        images,
      };

      if (serviceId) {
        const result = await api(`/vendor/services/${serviceId}`, "PATCH", body);
        if (result.matchedCount === 0) {
          throw new Error("You can only edit your own services");
        }
        toast.success("Service updated successfully");
      } else {
        await api("/vendor/services", "POST", body);
        toast.success("Service submitted. It will be visible after admin approval.");
      }

      router.push("/dashboard/vendor/services");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-2xl space-y-6 rounded-2xl border border-border bg-card p-6"
    >
      <div className="space-y-2.5">
        <Label htmlFor="serviceName">Service name</Label>
        <Input id="serviceName" name="serviceName" defaultValue={service?.serviceName} required />
      </div>

      <div className="space-y-2.5">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          name="category"
          defaultValue={service?.category || ""}
          required
          className="h-[52px] w-full rounded-xl border border-input bg-card px-4 text-[15px] text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => {
            const name = typeof category === "string" ? category : category.name;
            return (
              <option key={name} value={name}>
                {name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="space-y-2.5">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={service?.description} required />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2.5">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="1"
            defaultValue={service?.price}
            required
          />
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" defaultValue={service?.location} required />
        </div>
      </div>

      <div className="space-y-2.5">
        <Label htmlFor="images">
          Service images (up to 3){serviceId ? " - leave empty to keep current images" : ""}
        </Label>
        <Input id="images" name="images" type="file" accept="image/*" multiple />
      </div>

      <Button type="submit" disabled={saving} className="h-[52px] w-full rounded-lg text-[15px]">
        {saving ? "Saving..." : serviceId ? "Update Service" : "Add Service"}
      </Button>
    </form>
  );
}
