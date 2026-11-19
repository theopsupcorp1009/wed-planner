import { Skeleton } from "@/components/ui/skeleton";

/**
 * Mirrors the auth form geometry so the swap to real content is seamless.
 */
export function AuthFormSkeleton({ fields = 2, withLink = false }) {
  return (
    <div className="w-full" aria-hidden="true">
      <Skeleton className="h-11 w-56 rounded-md sm:w-64" />
      <Skeleton className="mt-4 h-4 w-44 rounded-md" />

      <div className="mt-10 space-y-7">
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index} className="space-y-2.5">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-[52px] w-full rounded-xl" />
          </div>
        ))}
      </div>

      <div className="mt-10 space-y-3">
        <Skeleton className="h-[52px] w-full rounded-lg" />
        {withLink ? (
          <Skeleton className="mx-auto h-4 w-28 rounded-md" />
        ) : (
          <Skeleton className="h-[52px] w-full rounded-lg" />
        )}
      </div>
    </div>
  );
}
