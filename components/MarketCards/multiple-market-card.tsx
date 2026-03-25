import {
  ArrowDown02Icon,
  ArrowReloadHorizontalIcon,
  CircleArrowUpDownIcon,
  VerticalScrollPointIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "motion/react";
import Link from "next/link";

interface MultipleOutcome {
  key: string;
  question: string;
  text: string;
  chances: string;
}

interface MultipleCardProps {
  image: string;
  des: string;
  vol: string;
  frequency?: "daily" | "monthly" | "totally" | "none";
  multipleOutcomes: MultipleOutcome[];
  marketId: string;
}

export const MultipleCard = ({
  image,
  des,
  vol,
  frequency = "none",
  multipleOutcomes,
  marketId,
}: MultipleCardProps) => {
  return (
    <div className="bg-linear-to-t from-[#141414] to-[#262626] aspect-video rounded-xl p-4 flex flex-col">
      <Link href={`market/${marketId}`}>
        <div className="flex items-center gap-2 flex-1 mb-4">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-lg overflow-hidden relative shrink-0">
            <img
              src={image}
              alt={`image`}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-white text-sm text-balance font-semibold pl-2 line-clamp-2">
            {des ? des : "Lorem ipsum dolor, sit amet"}
          </p>
        </div>
      </Link>
      {/* ////// Multiple Outcomes  */}
      <ScrollArea className="h-13 md:h-11 lg:h-13 rounded-md relative mb-3">
        <div className="flex flex-col gap-1">
          {multipleOutcomes.map((outcomes) => {
            return (
              <div key={outcomes.key} className="flex items-center">
                <div className="flex-1 line-clamp-1">
                  <span className="text-xs">
                    {outcomes.text ? outcomes.text : "Lorem"}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs">{outcomes.chances}</span>
                </div>

                <div className="flex gap-2 items-center ml-4 mr-2 md:mr-3">
                  <Link
                    href={`/market/${marketId}`}
                    className="py-1 px-4 text-xs rounded-sm bg-linear-to-b from-[#25A589] to-[#11373B] cursor-pointer"
                  >
                    Yes
                  </Link>
                  <Link
                    href={`/market/${marketId}`}
                    className="py-1 px-4 text-xs rounded-sm bg-gradient-to-b from-[#6A4BC6] to-[#2E255A] cursor-pointer"
                  >
                    No
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        {/* <span className="absolute bottom-0 flex justify-center w-full h-10 bg-linear-to-t from-neutral-900/60 rounded-b-md to-transparent pointer-events-none p-3">
          
        </span> */}

        {/* <ScrollHintArrow /> */}
        <div className="h-full w-1 absolute top-0 right-0">
          <ScrollBar className="bg-neutral-700 rounded-full w-1" />
        </div>
      </ScrollArea>

      {/* ////////////////////////  */}
      <div className="flex-1 flex items-end">
        <div className="flex gap-1 text-[12px] items-center text-[#aaaaaa]">
          <span>{vol} Vol</span>
          <HugeiconsIcon icon={ArrowReloadHorizontalIcon} size={14} />
          <span> {frequency}</span>
        </div>
      </div>
    </div>
  );
};

export function ScrollHintArrow() {
  return (
    <motion.span
      className="absolute bottom-15 w-full h-10 pointer-events-none p-3 flex justify-end items-center"
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, 8, 0, 0],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 6, // ⬅️ waits 12s before repeating
      }}
    >
      <HugeiconsIcon
        icon={ArrowDown02Icon}
        className="text-neutral-500"
        size={18}
      />
    </motion.span>
  );
}
