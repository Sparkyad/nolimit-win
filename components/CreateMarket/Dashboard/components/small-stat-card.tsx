import { cn } from "@/lib/utils";

interface SmallCardProps {
  img: string;
  label: string;
  stats: string;
  className?: string;
  labelColor?: string;
}

export const SmallCard = ({ img, label, stats, className,labelColor }: SmallCardProps) => {
  return (
    <div
      className="relative rounded-[20px] p-[1px] 
  bg-linear-to-br from-white/45 via-white/10 to-transparent flex-1"
    >
      <div
        className=" 
  bg-linear-to-tl relative rounded-[20px] p-[1px] from-white/45 via-white/10 to-transparent"
      >
        <div className="rounded-[20px] bg-linear-to-t from-[#0E0E0E] to-neutral-900 p-6 flex flex-col">
          <img src={img} alt="icon" className="w-12 flex-1 pb-12" />
          <div className="flex flex-col gap-1">
            <span className={cn("tracking-tight text-sm", className, labelColor)}>
              {label}
            </span>
            <span className="text-2xl font-bold tracking-tight">{stats}</span>
          </div>
        </div>
      </div>
    </div>
  );
};