import { Store } from "lucide-react";

export const metadata = {
  title: "Vendors",
};

export default function AdminVendorsPage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Vendors
      </h1>
      <p className="mt-2 text-muted-foreground">
        Review vendor profiles and keep the marketplace trustworthy.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-14 text-center">
        <Store
          className="mx-auto size-8 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-4 font-medium text-foreground">No vendors yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Vendor accounts will appear here for approval.
        </p>
      </div>
    </section>
  );
}
