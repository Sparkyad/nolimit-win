"use client";

import { AlertTriangle, Pen } from "lucide-react";
import { CreateMarketPageFrame } from "../../ui/create-market-page-frame";
import { TitleForm } from "../components/Forms/title-form";
import { DescriptionForm } from "../components/Forms/description-form";
import { CategorySelect } from "../components/Forms/category-select";
import { OutcomeSelect } from "../components/Forms/outcome-select";
// import { Thumbnail } from "../components/Forms/thumbnail";

import { DateAndTime } from "../components/Forms/date-and-time";
import { SubmitBtns } from "../components/Forms/submit-btns";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { Fuzzy_Bubbles } from "next/font/google";
import { Button } from "@/components/ui/button";
import { MarketMarquee } from "../components/Visuals/market-marquee";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AssignmentsIcon,
  BulbIcon,
  Calendar01Icon,
  Camera02Icon,
  FileStarIcon,
  SquareLock01Icon,
  Tick03Icon,
} from "@hugeicons/core-free-icons";
import { PingIndicator } from "../../ui/ping-indicator";
import { VideoUpload } from "../components/Forms/video-upload";
import React, { useEffect, useState } from "react";
import { categories } from "@/constants";
import { useSearchParams } from "next/navigation";
import { ThumbnailDropzone } from "../components/Forms/thumbnail";
import { NoLimitCalendar } from "@/components/Calendar/nolimit-calendar";
import SmoothTab from "@/components/kokonutui/smooth-tab";
import { useAdminStore } from "@/store/useAdminStore";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderView } from "@/components/Loader/loader-view";
import { Separator } from "@/components/ui/separator";

const fuzzy = Fuzzy_Bubbles({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const CreateMarketView = () => {
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const { role, loading } = useAdminStore();

  const [data, setData] = useState<MarketFormData>({
    question: "",
    rules: "",
    category: categories[0],
    outcomes: [],
    imageUrl: "",
    closeTime: null,
    reasonForRej: "",
  });

  useEffect(() => {
    if (!editId) return;

    const fetchMarket = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profiles/rejected-market/${editId}`,
        { credentials: "include" },
      );

      const market = await res.json();
      // console.log("Edit Rejected Markets", market);
      setData({
        question: market.question ?? "",
        rules: market.rules ?? "",
        category: market.category ?? categories[0],
        outcomes:
          market.outcomes?.length > 0 ? JSON.parse(market.outcomes) : [],
        imageUrl: market.imageUrl ?? "",
        ...(market.videoUrl ? { videoUrl: market.videoUrl } : {}),
        closeTime: new Date(market.closeTime),
        reasonForRej: market.reasonForRej,
      });
    };

    fetchMarket();
  }, [editId]);
  // "p-5 lg:p-20 flex flex-col gap-10 md:gap-20"
  // "md:grid md:grid-cols-2 md:gap-4"

  if (loading) return <LoaderView />;
  return (
    <CreateMarketPageFrame>
      <div className="mx-auto max-w-[1400px] p-7 gap-10">
        <div className="flex flex-col gap-10 min-[1196px]:gap-20 items-center">
          <CreateMarketHeader isEdit={!!editId} />

          <div className="grid grid-cols-1 min-[1196px]:grid-cols-2 gap-6">
            <MarketForm
              data={data}
              setData={setData}
              editId={editId}
              isAdminOrMod={role === "admin" || role === "moderator"}
            />
            <MarketPreview />
          </div>
        </div>
      </div>
    </CreateMarketPageFrame>
  );
};

export const CreateMarketHeader = ({ isEdit }: { isEdit: boolean }) => {
  return (
    <div className="flex flex-col gap-1 min-[1196px]:self-start">
      <span className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-b from-[#676767] to-[#dddddd]">
        {isEdit ? "Edit Rejected Market" : "Submit a New Market"}
      </span>
      <span className="text-sm text-neutral-300">
        {isEdit
          ? "Fix the issues and resubmit your market"
          : "Submit a new market submission"}
      </span>
    </div>
  );
};

export interface MarketFormData {
  question: string;
  rules: string;
  category: (typeof categories)[number];
  outcomes: string[];
  imageUrl: string;
  imageFile?: File | null;
  videoUrl?: string;
  videoFile?: File | null;
  closeTime: Date | null;
  reasonForRej?: string;
  interval?: 30 | 60 | 1440;
}

interface Props {
  data: MarketFormData;
  setData: React.Dispatch<React.SetStateAction<MarketFormData>>;
  editId: string | null;
  isAdminOrMod: boolean;
}

export const MarketForm = ({ data, setData, editId, isAdminOrMod }: Props) => {
  return (
    <div className="flex flex-col gap-10">
      {data.reasonForRej && <RejectedReason reason={data.reasonForRej} />}
      <TitleForm data={data} setData={setData} />
      <DescriptionForm data={data} setData={setData} />
      <CategorySelect data={data} setData={setData} />
      <OutcomeSelect
        data={data}
        setData={setData}
        isAdminOrMod={isAdminOrMod}
      />
      {/* <Thumbnail data={data} setData={setData} /> */}
      {isAdminOrMod && data.outcomes.length < 2 && <IntervalSelector data={data} setData={setData} />}

      <ThumbnailDropzone data={data} setData={setData} />
      <VideoUpload data={data} setData={setData} />
      <DateAndTime data={data} setData={setData} />
      <SubmitBtns data={data} editId={editId} />
    </div>
  );
};

interface IntervalProps {
  data: MarketFormData;
  setData: React.Dispatch<React.SetStateAction<MarketFormData>>;
}

export const IntervalSelector = ({ data, setData }: IntervalProps) => {
  const intervals: (30 | 60 | 1440)[] = [30, 60, 1440];

  return (
    <div className="relative flex flex-col gap-3">

      <span className="text-neutral-300 font-medium tracking-wider">
        Update Interval
      </span>


      <div className="flex gap-3">
        {intervals.map((value) => {
          const isActive = data.interval === value;

          return (
            <button
              key={value}
              type="button"
              onClick={() => setData((prev) => ({ ...prev, interval: value }))}
              className={`
                relative px-5 py-2 rounded-xl text-sm font-medium
                transition-all duration-200 cursor-pointer
                border
                ${isActive
                  ? "bg-emerald-500/15 border-emerald-400 text-emerald-300 shadow-[0_0_0_1px_rgba(52,211,153,0.3)]"
                  : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                }
              `}
            >
              {value === 1440 ? "1 day" : `${value} min`}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-balance text-neutral-500 leading-relaxed max-w-md">
        Controls how often the market updates while it is live.
      </p>
    </div>
  );
};

interface RejectedReasonProps {
  reason: string;
}

export const RejectedReason = ({ reason }: RejectedReasonProps) => {
  return (
    <div
      className="
        relative overflow-hidden max-w-96
        rounded-2xl border border-red-500/20
        bg-linear-to-br from-red-950/30 via-neutral-900 to-neutral-950
        p-5
      "
    >
      <div className="absolute inset-0 pointer-events-none bg-red-500/5 blur-2xl" />

      <div className="relative z-10 flex items-center gap-3">
        <div className="flex items-center gap-2 text-red-400">
          <AlertTriangle size={18} />
          <span className="uppercase tracking-widest text-xs font-mono">
            Rejected by Moderation
          </span>
        </div>

        <PingIndicator color="red" />
      </div>

      <div className="my-3 h-px bg-linear-to-r from-red-500/40 via-red-500/10 to-transparent" />

      <p className="relative z-10 text-sm leading-relaxed text-neutral-200">
        {reason}
      </p>

      <p className="relative z-10 mt-3 text-xs text-neutral-400 italic">
        Update and resubmit your market for review.
      </p>
    </div>
  );
};

export const MarketPreview = () => {
  return (
    <div className="border-neutral-800 hidden min-[1196px]:flex flex-col gap-10">
      <div>
        <MarketRules />
      </div>
      <div className="relative">
        <MarketMarquee />
        <div className="absolute -top-10 w-full">
          <VisualOne />
        </div>
      </div>
      <div className="flex justify-center pt-10">
        <img
          src="/CreateMarket/Form/dotted-border.png"
          alt="dotter-png"
          className="w-12 lg:w-20 rotate-12"
        />
      </div>
      <div>
        <UnderReview />
      </div>
    </div>
  );
};

export const MarketRules = () => {
  return (
    <div className="mb-15 flex flex-col gap-5">
      <div className="text-2xl font-semibold flex justify-between">
        <span className="flex items-center gap-2">
          <img
            src="/CreateMarket/Form/bolt.png"
            alt="bolt-png"
            className="w-4"
          />
          <span>Market Rules</span>
        </span>
        <div>
          <HowItWorksDialog />
        </div>
      </div>

      <div>
        <SmoothTab />
      </div>
    </div>
  );
};

{
  /* <div className="relative">
  <img src="/graphics/g-1.png" className="py-2" />
  <div className="absolute top-0 text-2xl tracking-tighter">
    <h3>
      Creating a market requires a <br /> one-time fee of{" "}
      <span className="text-emerald-500 font-bold">10</span> USDC.
    </h3>
  </div>
</div>; */
}

export const HowItWorksDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="text-neutral-400 hover:text-white transition duration-75 cursor-pointer px-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0"
        >
          How It Works?
        </Button>
      </DialogTrigger>
      <DialogContent className="border-none bg-linear-to-b from-neutral-950 to-neutral-900">
        <DialogTitle className="text-sm text-neutral-300 text-center flex flex-col">
          How to Create a Market?
          {/* <span className="text-xs text-balance">
            Follow these simple steps to create and publish your market.
          </span> */}
        </DialogTitle>
        <div className="flex flex-col gap-5">
          {[
            {
              title: "Create a Question",
              desc: "Ask a clear and engaging question that users would want to trade on.",
              icon: BulbIcon,
            },
            {
              title: "Add a Short Description",
              desc: "Briefly explain what your question is about and what users should consider.",
              icon: AssignmentsIcon,
            },
            {
              title: "Choose Category & Market Type",
              desc: "Select the relevant category and define options if the market is multiple choice.",
              icon: FileStarIcon,
            },
            {
              title: "Upload Media",
              desc: "Add a photo or video to help promote your market.",
              icon: Camera02Icon,
            },
            {
              title: "Set the End Date",
              desc: "Choose when your market should end. Sports markets must end before game start.",
              icon: Calendar01Icon,
            },
          ].map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-900/40 px-4 py-3 h-24 md:20"
            >
              {/* Step Number */}
              {/* <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-medium text-emerald-400">
                {index + 1}
              </div> */}

              {/* Icon */}
              <HugeiconsIcon
                icon={step.icon}
                size={27}
                className="text-neutral-400 shrink-0"
              />

              {/* Text */}
              <div>
                <p className="text-sm font-medium text-neutral-100">
                  {step.title}
                </p>
                <p className="text-xs leading-relaxed text-neutral-400">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <DialogClose asChild>
            <Button variant="newYesBtn" className="flex-1 cursor-pointer">
              Got It? Let's Create a Market
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const VisualOne = () => {
  return (
    <div className="relative flex flex-col items-center gap-4">
      {/* Heading */}
      <span className={`${fuzzy.className} text-neutral-400`}>
        Will this Event Happen?
      </span>
      <img
        src="/CreateMarket/Form/trum.avif"
        alt="trump-preview"
        className="w-96"
      />
      {/* End date */}
      <span className={`${fuzzy.className} text-neutral-400 text-sm`}>
        Spark up your creativity, Spark up a Market
      </span>
    </div>
  );
};

export const MedalVisual = () => {
  return (
    <div className="flex flex-col gap-14">
      <div className="-rotate-12">
        <span className={`${fuzzy.className} text-neutral-400`}>
          Earn a Badge
        </span>
      </div>
      <img src="/CreateMarket/Form/medals.png" alt="medals" className="w-1/2" />
    </div>
  );
};

export const UnderReview = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div
        className={`text-center ${fuzzy.className} text-neutral-300 flex justify-center w-full -rotate-6 mb-5`}
      >
        <span>What Happens Next?</span>
      </div>
      <div className="flex gap-1 items-center">
        <span className="py-2 px-4 text-sm rounded-full bg-emerald-600 flex gap-1 items-center">
          <HugeiconsIcon icon={Tick03Icon} className="text-white" size={18} />
          Submitted
        </span>
        <span>
          <img
            src="/CreateMarket/Form/arrow.png"
            alt="arrow-1"
            className="w-24"
          />
        </span>
        <span className="flex gap-3 items-center">
          <PingIndicator color="white" />
          <span className="font-bold text-xl">Under Review</span>
        </span>
        <span>
          <img
            src="/CreateMarket/Form/arrow.png"
            alt="arrow-1"
            className="w-24"
          />
        </span>
        <span className="flex items-center gap-2 text-lg font-medium text-emerald-400">
          <HugeiconsIcon icon={SquareLock01Icon} size={19} />
          Live
        </span>
      </div>
      <div
        className={`${fuzzy.className} flex justify-center items-center text-center`}
      >
        <p className="text-sm text-neutral-500 text-balance w-lg">
          Our team reviews market clarity, resolution rules, and duplication.
          Approved markets go live for real trading.
        </p>
      </div>
    </div>
  );
};
