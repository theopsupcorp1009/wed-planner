import { Skeleton } from "@/components/ui/skeleton";

/** Generic placeholder for the dashboard content area. */
export default function DashboardSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <div className="space-y-3">
        <Skeleton className="h-10 w-64 rounded-md" />
        <Skeleton className="h-4 w-80 rounded-md" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <Skeleton key={item} className="h-[104px] rounded-2xl" />
        ))}
      </div>

      <Skeleton className="h-64 w-full rounded-2xl" />
    </div>
  );
}
