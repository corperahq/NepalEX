import { Skeleton, StatCardSkeleton, TableSkeleton } from "@/components/dashboard/skeleton";

export default function ClientLoading() {
  return (
    <>
      <Skeleton className="h-8 w-56" />
      <Skeleton className="mt-2 h-4 w-72" />
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
      <div className="mt-6">
        <TableSkeleton rows={6} cols={5} />
      </div>
    </>
  );
}
