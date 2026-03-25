type StatCardProps = {
  label: string;
  value?: number;
  wins?: number;
  predictions?: string;
};

export const StatCard = ({
  label,
  value,
  wins,
  predictions,
}: StatCardProps) => {
  const displayValue = value ?? wins ?? predictions ?? "--";

  return (
    <span className="flex flex-col gap-2">
      <span className="font-light text-sm text-neutral-300">{label}</span>

      <span className="md:text-lg font-bold text-xs">
        {displayValue === wins && "+$"}
        {displayValue}
      </span>
    </span>
  );
};
