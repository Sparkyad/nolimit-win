import { cn } from "@/lib/utils";

const colorMap: Record<string, string> = {
  green: "bg-green-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  blue: "bg-blue-500",
  orange: "bg-orange-500",
  white: "bg-white"
};

export const PingIndicator = ({ color = "green" }: { color?: string }) => {
  const bgColor = colorMap[color] ?? colorMap.green;
  return (
    <div className="relative flex h-2 w-2">
      <span
        className={cn(
          "absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping",
          bgColor
        )}
      ></span>
      <span
        className={cn(
          "relative inline-flex h-2 w-2 rounded-full bg-green-500",
          bgColor
        )}
      ></span>
    </div>
  );
};
