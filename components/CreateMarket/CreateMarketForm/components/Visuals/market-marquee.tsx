import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const markets = [
  {
    id: 1,
    title: "Will Trump meet with Putin by December?",
    author: "Ariana",
    profit: "+18.4%",
    img: "/card-images/usa.jfif",
  },
  {
    id: 2,
    title: "Ukraine conflict escalation risk",
    author: "Jack",
    profit: "+12.1%",
    img: "/card-images/putin.jfif",
  },
  {
    id: 3,
    title: "Grammy Album of the Year Winner",
    author: "Jenny",
    profit: "+9.7%",
    img: "/card-images/grammy.jpg",
  },
  {
    id: 4,
    title: "Top 5 Spotify Artist This Year",
    author: "James",
    profit: "+22.3%",
    img: "/card-images/weekend.jpeg",
  },
];

const firstRow = markets.slice(0, markets.length / 2);
const secondRow = markets.slice(markets.length / 2);

const MarketCard = ({
  img,
  title,
  author,
  profit,
}: {
  img: string;
  title: string;
  author: string;
  profit: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-72 overflow-hidden rounded-xl border",
        "border-neutral-800 bg-[#1b1b1b] p-4",
        "hover:bg-[#222] transition"
      )}
    >
      <div className="flex items-center gap-3">
        <img
          src={img}
          alt={title}
          className="h-12 w-12 rounded-md object-cover"
        />

        <div className="flex flex-col min-w-0">
          <span className="truncate text-sm font-medium text-neutral-200">
            {title}
          </span>
          <span className="text-xs text-neutral-500">by {author}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-neutral-500">Profit</span>
        <span className="text-sm font-medium text-emerald-400">{profit}</span>
      </div>
    </figure>
  );
};

export function MarketMarquee() {
  return (
    <div className="relative flex w-full flex-col overflow-hidden">
      <Marquee pauseOnHover className="[--duration:25s]">
        {firstRow.map((market) => (
          <MarketCard key={market.id} {...market} />
        ))}
      </Marquee>

      <Marquee reverse pauseOnHover className="[--duration:25s]">
        {secondRow.map((market) => (
          <MarketCard key={market.id} {...market} />
        ))}
      </Marquee>

      {/* Gradient fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[#0C0C0C] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[#0C0C0C] to-transparent" />
    </div>
  );
}
