import { Skeleton } from "@/components/ui/skeleton";

export const SmallCardSkeleton = () => {
  return (
    <div
      className="relative rounded-[20px] p-[1px] 
      bg-linear-to-br from-white/45 via-white/10 to-transparent flex-1"
    >
      <div
        className="relative rounded-[20px] p-[1px] 
        bg-linear-to-tl from-white/45 via-white/10 to-transparent"
      >
        <div className="rounded-[20px] bg-linear-to-t from-[#0E0E0E] to-neutral-900 p-6 flex flex-col">
          
          {/* Icon placeholder */}
          <Skeleton className="w-12 h-12 rounded-md mb-12" />

          {/* Text placeholders */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-7 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
};
