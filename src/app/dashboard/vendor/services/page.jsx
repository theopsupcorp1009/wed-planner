import { Store } from "lucide-react";

export const metadata = {
  title: "My Services",
};

export default function VendorServicesPage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        My Services
      </h1>
      <p className="mt-2 text-muted-foreground">
        List the packages you offer so couples can find and book you.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-14 text-center">
        <Store
          className="mx-auto size-8 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-4 font-medium text-foreground">No services yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Your published packages will appear here.
        </p>
      </div>
    </section>
  );
}
