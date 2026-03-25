import { formatUtcDate } from "@/lib/formatUtcDate";

interface ClosedListProps {
  title: string;
  createdAt: string; // ISO date
  creatorFee: number;
}

// const GRID_COLS = "grid-cols-[3fr_1fr]";

export const ClosedList = ({ title, createdAt, creatorFee }: ClosedListProps) => {
  return (
    <div
      className={`grid grid-cols-[2fr_1fr] md:grid-cols-[3fr_1fr_1fr]  items-center`}
    >
      {/* COLUMN 1 */}
      <div className="flex items-center gap-3 min-w-0">
        <p className="truncate line-clamp-2 text-sm lg:text-lg font-medium">
          {title}
        </p>
      </div>

      <div className="text-right md:text-center">
        <span className="font-semibold text-neutral-300 text-xs md:text-sm">{creatorFee}</span>
      </div>

      {/* COLUMN 2 (Created At) */}
      <div className="hidden md:block text-neutral-400 text-sm text-right">
        <span className="text-neutral-500 text-xs lg:text-sm text-center">
          {formatUtcDate(createdAt)}
        </span>
      </div>
    </div>
  );
};
