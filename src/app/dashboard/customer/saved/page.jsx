import { Heart } from "lucide-react";

export const metadata = {
  title: "Saved Vendors",
};

export default function CustomerSavedPage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Saved Vendors
      </h1>
      <p className="mt-2 text-muted-foreground">
        Keep your favourite photographers, venues and florists in one place.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-14 text-center">
        <Heart
          className="mx-auto size-8 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-4 font-medium text-foreground">No saved vendors yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Vendors you save while browsing will appear here.
        </p>
      </div>
    </section>
  );
}
