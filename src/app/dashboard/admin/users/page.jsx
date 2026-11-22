"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingBlock, Message, PageTitle, StatusPill } from "@/components/dashboard/dashboard-parts";
import { api } from "@/lib/api";

export default function AdminUsersPage() {
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api("/admin/users")
      .then(setUsers)
      .catch((err) => {
        toast.error(err.message);
        setUsers([]);
      });
  }, []);

  const handleBlock = async (user) => {
    const isBlocked = !user.isBlocked;

    try {
      await api(`/admin/users/${user._id}`, "PATCH", { isBlocked });
      setUsers(users.map((item) => (item._id === user._id ? { ...item, isBlocked } : item)));
      toast.success(isBlocked ? "User blocked" : "User unblocked");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredUsers = users
    ? users.filter((user) => {
        const text = `${user.name} ${user.email}`.toLowerCase();
        return text.includes(search.toLowerCase()) && (!roleFilter || user.role === roleFilter);
      })
    : [];

  return (
    <section>
      <PageTitle title="Manage Users" text="Every customer and vendor account on the platform." />

      <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_200px]">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="h-[52px] rounded-xl border border-input bg-card px-4 text-[15px] text-foreground outline-none"
        >
          <option value="">All roles</option>
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {!users ? (
        <LoadingBlock rows={5} />
      ) : filteredUsers.length === 0 ? (
        <Message text="No users found." />
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="px-5 py-4 font-normal">Name</th>
                <th className="px-5 py-4 font-normal">Email</th>
                <th className="px-5 py-4 font-normal">Role</th>
                <th className="px-5 py-4 font-normal">Status</th>
                <th className="px-5 py-4 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="px-5 py-4 font-medium text-foreground">{user.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{user.email}</td>
                  <td className="px-5 py-4 capitalize text-muted-foreground">{user.role}</td>
                  <td className="px-5 py-4">
                    <StatusPill status={user.isBlocked ? "blocked" : "active"} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="secondary" onClick={() => setSelected(user)}>
                        Details
                      </Button>
                      {user.role !== "admin" ? (
                        <Button size="sm" variant="outline" onClick={() => handleBlock(user)}>
                          {user.isBlocked ? "Unblock" : "Block"}
                        </Button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-serif text-2xl font-semibold text-foreground">{selected.name}</h2>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent"
              >
                <X className="size-4" />
              </button>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="text-foreground">{selected.email}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Role</dt>
                <dd className="capitalize text-foreground">{selected.role}</dd>
              </div>
              {selected.role === "vendor" ? (
                <>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Business</dt>
                    <dd className="text-foreground">{selected.businessName || "-"}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Plan</dt>
                    <dd className="capitalize text-foreground">
                      {selected.subscriptionPlan || "free"}
                    </dd>
                  </div>
                </>
              ) : null}
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Joined</dt>
                <dd className="text-foreground">
                  {new Date(selected.createdAt).toLocaleDateString("en-GB")}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Blocked</dt>
                <dd className="text-foreground">{selected.isBlocked ? "Yes" : "No"}</dd>
              </div>
            </dl>
          </div>
        </div>
      ) : null}
    </section>
  );
}
