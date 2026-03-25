import { Skeleton } from "@/components/ui/skeleton";

export const ActiveListSkeleton = ({ rows = 6 }: { rows?: number }) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="px-5">
        <Skeleton className="h-3 w-24" />
      </div>

      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={`flex gap-4 items-center p-4 ${
            i % 2 === 0 ? "bg-[#181818]" : "bg-[#1a1a1a]"
          }`}
        >
          {/* Market image */}
          <Skeleton className="w-12 h-12 rounded-md" />

          {/* Text + meta */}
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-4 w-3/4" />

            <div className="flex gap-2 items-center">
              <Skeleton className="h-5 w-12 rounded-sm" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
