import { Skeleton } from "@/components/ui/skeleton";

export const ActivityListSkeleton = ({ rows = 6 }: { rows?: number }) => {
  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Desktop header */}
      <div className="hidden md:grid grid-cols-[1fr_7fr_1fr]">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20 ml-auto" />
      </div>

      {/* Desktop rows */}
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={`desktop-${index}`}
          className="hidden md:grid grid-cols-[1fr_7fr_1fr] items-center"
        >
          {/* TYPE */}
          <Skeleton className="h-4 w-12" />

          {/* MARKET */}
          <div className="flex gap-2">
            <Skeleton className="w-12 h-12 rounded-md" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-2 items-center">
                <Skeleton className="h-5 w-12 rounded-sm" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>

          {/* AMOUNT */}
          <div className="flex flex-col items-end gap-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}

      {/* Mobile rows */}
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={`mobile-${index}`}
          className="grid grid-cols-[4fr_1fr] md:hidden"
        >
          {/* LEFT */}
          <div className="flex gap-2 items-center">
            <Skeleton className="w-12 h-12 rounded-md shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-3 w-5/6" />
              <div className="flex gap-2 items-center">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-5 w-12 rounded-sm" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-end">
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      ))}
    </div>
  );
};
