import { Skeleton } from "@/components/ui/skeleton";

export default function BlogCardSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-lg shadow">
      {/* Image */}
      <Skeleton className="aspect-video w-full" />

      {/* Category */}
      <div className="px-5 pt-4">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <Skeleton className="mb-4 h-6 w-4/5" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-11/12" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
    </div>
  );
}