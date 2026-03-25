import { cn } from "@/lib/utils";

interface AdminSmallCardProps {
  img: string;
  label: string;
  stats: string;
  className?: string;

  variant?: "highlight" | "default";
}

export const AdminSmallCard = ({
  img,
  label,
  stats,
  className,

  variant = "default",
}: AdminSmallCardProps) => {
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
            "rounded-[20px] p-6 flex flex-col",
            isHighlight
              ? "bg-linear-to-t from-[#0E0E0E] to-emerald-500"
              : "bg-linear-to-t from-[#0E0E0E] to-neutral-900"
          )}
        >
          <img src={img} alt="icon" className="w-14 flex-1 pb-12" />
          <div className="flex flex-col gap-1">
            <span className={cn("tracking-tight text-sm", className)}>
              {label}
            </span>
            <span className="text-2xl font-bold tracking-tight">{stats}</span>
            {/* <span className="text-sm font-light">Compared to last month</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};
