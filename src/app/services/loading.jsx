import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesLoading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Skeleton className="mb-6 h-10 w-72" />
      <Skeleton className="mb-8 h-24 w-full rounded-2xl" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Skeleton key={item} className="h-72 w-full rounded-2xl" />
        ))}
      </div>
    </section>
  );
}
