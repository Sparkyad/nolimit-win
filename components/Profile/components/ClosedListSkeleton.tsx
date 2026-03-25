import { Skeleton } from "@/components/ui/skeleton";

export const ClosedListSkeleton = ({ rows = 6 }: { rows?: number }) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="px-5 flex gap-4">
        <Skeleton className="h-3 w-24 flex-3" />
        <Skeleton className="h-3 w-16 hidden md:block flex-1" />
        <Skeleton className="h-3 w-20 hidden md:block flex-1" />
      </div>

      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={`flex items-center py-4 px-4 ${
            i % 2 === 0 ? "bg-[#1F1F1F]" : "bg-[#232323]"
          }`}
        >
          {/* Market */}
          <div className="flex-3 flex gap-4 items-center">
            <Skeleton className="w-12 h-12 rounded-md" />

            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-24 md:hidden" />
            </div>
          </div>

          {/* Result */}
          <div className="flex-1 hidden md:block">
            <Skeleton className="h-4 w-16" />
          </div>

          {/* PnL */}
          <div className="flex-1 hidden md:block text-right pr-5">
            <Skeleton className="h-4 w-16 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
};
