"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Message } from "@/components/dashboard/dashboard-parts";
import { authClient, useSession } from "@/lib/auth-client";
import { uploadImage } from "@/lib/uploadImage";

export default function ProfileForm({ isVendor }) {
  const { data: session } = useSession();
  const user = session?.user;
  const [saving, setSaving] = useState(false);

  if (!user) {
    return <Message text="Loading profile..." />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const form = new FormData(e.target);
      const imageFile = form.get("image");
      const data = { name: form.get("name").trim() };

      if (isVendor) {
        data.businessName = form.get("businessName").trim();
      }
      if (imageFile.size > 0) {
        data.image = await uploadImage(imageFile);
      }

      const { error } = await authClient.updateUser(data);
      if (error) {
        throw new Error(error.message);
      }

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-xl space-y-6 rounded-2xl border border-border bg-card p-6"
    >
      <div className="space-y-2.5">
        <Label htmlFor="name">Full name</Label>
        <Input id="name" name="name" defaultValue={user.name} required />
      </div>

      <div className="space-y-2.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={user.email} disabled readOnly />
      </div>

      {isVendor ? (
        <div className="space-y-2.5">
          <Label htmlFor="businessName">Business name</Label>
          <Input
            id="businessName"
            name="businessName"
            defaultValue={user.businessName || ""}
            required
          />
        </div>
      ) : null}

      <div className="space-y-2.5">
        <Label htmlFor="image">Profile image</Label>
        <Input id="image" name="image" type="file" accept="image/*" />
      </div>

      <Button type="submit" disabled={saving} className="h-[52px] w-full rounded-lg text-[15px]">
        {saving ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
