import { Users } from "lucide-react";

export const metadata = {
  title: "Users",
};

export default function AdminUsersPage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Users
      </h1>
      <p className="mt-2 text-muted-foreground">
        Every customer and vendor account on the platform.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-14 text-center">
        <Users
          className="mx-auto size-8 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-4 font-medium text-foreground">No users yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Registered accounts will appear here.
        </p>
      </div>
    </section>
  );
}
