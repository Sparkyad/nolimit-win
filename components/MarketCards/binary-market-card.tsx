import { ArrowReloadHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

interface Props {
  image: string;
  des: string;
  vol: string;
  frequency?: "daily" | "monthly" | "totally" | "none";
  marketId: string;
}

export const BinaryMarketCard = ({
  image,
  des,
  vol,
  frequency = "none",
  marketId,
}: Props) => {
  return (
    <div>
      <div className="bg-linear-to-t from-[#141414] to-[#262626] aspect-video rounded-xl p-4 flex flex-col">
        {/* //// Image And Des  */}
        <Link href={`market/${marketId}`}>
          <div className="flex items-center gap-2 flex-1 mb-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-lg overflow-hidden relative shrink-0">
              <img
                src={image}
                alt={`image-${vol}`}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white text-sm text-balance font-semibold pl-2 line-clamp-2">
              {des ? des : "Lorem ipsum dolor, sit amet."}
            </p>
          </div>
        </Link>
        {/* //BinaryMarket Button */}
        {/* py-1.5 px-10 lg:py-2 lg:px-11 */}
        <div className="h-13 lg:h-13 flex gap-3 justify-center items-center flex-1 mb-3">
          <Link
            href={`/market/${marketId}`}
            className="flex flex-1 justify-center py-3 md:py-3 lg:py-3 text-sm lg:text-base rounded-md bg-linear-to-b from-[#25A589] to-[#11373B] cursor-pointer"
          >
            Yes
          </Link>
          <Link
            href={`/market/${marketId}`}
            className="flex flex-1 justify-center py-3 md:py-3 lg:py-3 text-sm lg:text-base rounded-md bg-gradient-to-b from-[#6A4BC6] to-[#2E255A] cursor-pointer"
          >
            No
          </Link>
        </div>
        {/* /////////////////////  */}
        <div className="flex-1 flex items-end">
          <div className="flex gap-1 text-[12px] items-center text-[#aaaaaa]">
            <span>{vol} Vol</span>
            <HugeiconsIcon icon={ArrowReloadHorizontalIcon} size={14} />
            <span> {frequency}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="bg-muted/50 aspect-video rounded-xl p-4 flex flex-col gap-5">
  
  <div className="flex items-center gap-2">
    <div className="w-18 h-18 bg-white rounded-lg overflow-hidden relative shrink-0">
      <img
        src="/card-images/ai-park.jpeg"
        alt={`image`}
        className="w-full h-full object-cover"
      />
    </div>
    <p className="text-white text-sm text-balance font-semibold pl-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
      asperiores.
    </p>
  </div>

  <div className="flex gap-4 justify-center items-center">
    <span className="py-2 px-12 rounded-md bg-linear-to-b from-[#0B60B0] to-[#002A98]">
      Yes
    </span>
    <span className="py-2 px-12 rounded-md bg-linear-to-b from-[#AF3E3E] to-[#601A1A]">
      No
    </span>
  </div>
  
  <div>
    <div className="flex gap-1 text-[12px] items-center text-[#C7C7C7]">
      <span>19,399 Vol</span>
      <HugeiconsIcon icon={ArrowReloadHorizontalIcon} size={14} />
      <span> daily</span>
    </div>
  </div>
</div>; */
}
