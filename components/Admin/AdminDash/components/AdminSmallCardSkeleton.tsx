import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface AdminSmallCardSkeletonProps {
  variant?: "highlight" | "default";
}

export const AdminSmallCardSkeleton = ({
  variant = "default",
}: AdminSmallCardSkeletonProps) => {
  const isHighlight = variant === "highlight";

  return (
    <div
      className={cn(
        "relative rounded-[20px] p-[1px] flex-1",
        isHighlight
          ? "bg-linear-to-br from-emerald-500 via-emerald-500 to-transparent"
          : "bg-linear-to-br from-white/45 via-white/10 to-transparent"
      )}
    >
      <div
        className={cn(
          "relative rounded-[20px] p-[1px]",
          isHighlight
            ? "bg-linear-to-tl from-emerald-500 via-emerald-500 to-transparent"
            : "bg-linear-to-tl from-white/45 via-white/10 to-transparent"
        )}
      >
        <div
          className={cn(
            "rounded-[20px] p-6 flex flex-col gap-4",
            isHighlight
              ? "bg-linear-to-t from-[#0E0E0E] to-emerald-500"
              : "bg-linear-to-t from-[#0E0E0E] to-neutral-900"
          )}
        >
          {/* Icon skeleton */}
          <Skeleton className="w-12 h-12 rounded-full mb-10 bg-white/10" />

          {/* Text skeletons */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32 bg-white/10" />
            <Skeleton className="h-8 w-24 bg-white/15" />
            <Skeleton className="h-3 w-40 bg-white/10" />
          </div>
        </div>
      </div>
    </div>
  );
};
