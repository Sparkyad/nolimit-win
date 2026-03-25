import Link from "next/link";

interface Props {
  image: string;
  text: string;
  chance: string;
  href: string;
}

export const ExtraMarkets = ({ image, text, chance, href }: Props) => {
  const truncateWords = (str: string | undefined, limit: number) => {
    if (!str) return "";
    const words = str.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : str;
  };
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={`${chance}-image`}
          className="lg:w-10 w-10 aspect-square object-cover rounded-md"
        />
        <Link href={href ?? "#"} className="text-xs lg:text-sm text-balance">
          {truncateWords(text, 10)}
        </Link>
      </div>
      <div>
        <span className="text-sm lg:text-xl">{chance}%</span>
      </div>
    </div>
  );
};
