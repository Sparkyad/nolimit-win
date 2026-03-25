"use client";

import {
  BinaryMarketButtons,
  BinaryMarketButtonsProps,
} from "../components/binary-market-buttons";
import { MarketDetailMultipleCommentSection } from "@/components/Market/components/market-detail-multiple-comments";
import {
  ArrowReloadHorizontalIcon,
  Clock01Icon,
  Delete03Icon,
  Share05Icon,
} from "@hugeicons/core-free-icons";
import { ExpandedText } from "@/components/MarketDetail/components/expanded-text";
import { AmountInput } from "@/components/MarketDetail/components/amount-input";
import { TradeBtn } from "@/components/MarketDetail/components/trade-btn";
import { SampleChartTwo } from "@/components/Charts/sample-chart-two";
import { ExtraMarkets } from "../components/extra-markets";
import { Separator } from "@/components/ui/separator";
import { PageFrame } from "@/components/page-frame";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useMemo, useState } from "react";
import { GraphPoint } from "@/components/Charts/sample-multiple-market-chart";
import { compute24hChange } from "@/lib/compute-24h-change";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const MarketDetailView = ({
  market,
  graph,
  extraMarkets,
  postComment,
  comments,
  hasMoreComments,
  loadMoreComments,
  commentsTotalCount,
  isLoadingMoreComments,
  yesHolders,
  noHolders,
  amount,
  setAmount,
  marketId,
}: {
  market: any;
  marketId: string;
  graph: GraphPoint[];
  extraMarkets: {
    image: string;
    title: string;
    chance: string;
    href: string;
  }[];
  postComment: (content: string) => Promise<void>;
  comments: any[];
  hasMoreComments: boolean;
  loadMoreComments: () => Promise<void>;
  isLoadingMoreComments: boolean;
  commentsTotalCount: number;
  yesHolders: any[];
  noHolders: any[];
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [selectedOutcome, setSelectedOutcome] = useState<"yes" | "no">("yes");
  const [copied, setCopied] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const binaryMarket = market.binaryMarkets[0];
  const yesProb =
    Number(binaryMarket.totalVolume) > 0
      ? Number(binaryMarket.yesVolume) / Number(binaryMarket.totalVolume)
      : 0;
  const selectedOutcomeProb = selectedOutcome === "yes" ? yesProb : 1 - yesProb;

  const change24h = useMemo(() => {
    if (!graph || graph.length === 0) return 0;
    return compute24hChange(graph, 24);
  }, [graph, selectedOutcome]);
  const yesChange1h = compute24hChange(graph, 1);

  const shareUrl = `https://www.nolimit.com/market/${marketId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setOpenTooltip(true);

      setTimeout(() => {
        setCopied(false);
        setOpenTooltip(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <PageFrame>
      {/* INTERNAL HEIGHT WRAPPER */}
      <div className="p-3 lg:px-4 lg:py-10">
        <div className="flex flex-col md:flex-row gap-5 h-full">
          {/* LEFT COLUMN — SCROLLABLE */}
          <div className="flex-2 md:flex-3 flex flex-col gap-12 md:overflow-y-auto no-scrollbar">
            {/* Market Card */}
            <div className="flex flex-col p-4 md:p-6 gap-6 bg-neutral-900 rounded-lg">
              <div
                className={`flex ${market.videoUrl ? "flex-col" : "flex-row items-center"
                  } gap-5`}
              >
                {market.videoUrl ? (
                  <video
                    className="h-[300px] w-full rounded-lg"
                    loop
                    autoPlay
                    controls
                  >
                    <source src={market.videoUrl} />
                  </video>
                ) : market.imageUrl ? (
                  <img
                    src={market.imageUrl ?? "/card-images/ai-park.jpeg"}
                    alt="ai-park"
                    className="w-18 h-18 rounded-md"
                  />
                ) : (
                  <></>
                )}
                <p className="font-semibold lg:text-2xl max-w-lg text-balance">
                  {market.text}
                </p>
              </div>

              <div className="flex gap-3 text-xs text-[#C7C7C7]">
                <div className="flex gap-1 items-center">
                  <span>${market.totalVolume} Vol</span>
                  <HugeiconsIcon icon={ArrowReloadHorizontalIcon} size={15} />
                  <span>totally</span>
                </div>
                <HugeiconsIcon icon={Clock01Icon} size={15} />
                <span>
                  {new Date(binaryMarket.resolutionTime).toLocaleDateString(
                    "en-US",
                    { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }
                  )}
                </span>
              </div>

              <div className="flex gap-3 items-end">
                <span className="font-bold">
                  {(selectedOutcomeProb * 100).toFixed(2)}% Chance
                </span>
                <span className="text-sm">
                  {/* <span className="text-green-500">+1.2%</span> */}
                  <span
                    className={
                      change24h >= 0 ? "text-emerald-400" : "text-red-400"
                    }
                  >
                    {change24h >= 0 ? "+" : ""}
                    {change24h}%
                  </span>
                  <span className="text-neutral-200 ml-1">24h</span>
                </span>
                <Tooltip open={openTooltip} onOpenChange={setOpenTooltip}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleCopy}
                      className="ml-auto flex items-center gap-2 text-neutral-400"
                    >
                      <HugeiconsIcon
                        icon={Share05Icon}
                        className="size-5 cursor-pointer hover:text-white"
                      />
                    </button>
                  </TooltipTrigger>

                  <TooltipContent>
                    <span>{copied ? "Copied!" : "Share"}</span>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="font-semibold text-lg">
                {/* <SampleChart /> */}
                <SampleChartTwo graphData={graph} />
              </div>
            </div>

            {market.status !== "CLOSED" && new Date(market.minResolutionTime).getTime() > Date.now() &&
              <BinaryBuyPanelMobile
                selected={selectedOutcome}
                setSelected={setSelectedOutcome}
                binaryMarket={market.binaryMarkets[0]}
                yesChange1h={yesChange1h}
              />
            }

            {/* Rules */}
            <ExpandedText>
              <p>{binaryMarket.rules}</p>

              <span className="text-neutral-400 text-xs">
                {/* Created At: Dec 30, 2024, 4:22 AM */}
                Created At {new Date(market.createdAt).toLocaleString()}
              </span>
              {/* binaryMarket.umaTxHash */}
              {binaryMarket.umaTxHash && (
                <a
                  href={`${process.env.NEXT_PUBLIC_UMA_ORACLE_URL?.replace(/^"|"$/g, '')}?transactionHash=${binaryMarket.umaTxHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-neutral-900 rounded-lg w-full flex px-3 items-center gap-3 text-sm font-semibold text-neutral-200 hover:text-white p-2"
                >
                  <img
                    src="/m-detail/uma.png"
                    alt="uma logo"
                    className="w-12 rounded-xs"
                  />
                  Resolver
                </a>
              )}
            </ExpandedText>

            {/* Comments */}
            <MarketDetailMultipleCommentSection
              postComment={postComment}
              comments={{ items: comments, totalCount: commentsTotalCount }}
              yesHolders={yesHolders}
              noHolders={noHolders}
              loadMoreComments={loadMoreComments}
              hasMoreComments={hasMoreComments}
              isLoadingMoreComments={isLoadingMoreComments}
            />
          </div>

          {market.status !== "CLOSED" && new Date(market.minResolutionTime).getTime() > Date.now() && (
            <>
              {/* RIGHT COLUMN — STICKY */}
              <div className="hidden md:flex md:flex-1 flex-col gap-12 sticky top-6 h-fit">
                {/* Buy Panel */}
                <div className="border border-neutral-800 rounded-md flex flex-col">
                  <div className="py-3 px-5">
                    <span className="text-neutral-400 font-bold tracking-wider">
                      Buy
                    </span>
                  </div>

                  <Separator className="bg-neutral-800" />

                  {/* <MarketButtons /> */}
                  <BinaryMarketButtons
                    selected={selectedOutcome}
                    setSelected={setSelectedOutcome}
                    yesChange1h={yesChange1h}
                  />

                  <div className="px-5 py-5 flex flex-col gap-3">
                    <span className="text-neutral-300 text-sm flex justify-between">
                      <span>Amount</span>
                      <AnimatePresence>
                        {amount && (
                          <motion.button
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 100 }}
                            exit={{ x: 10, opacity: 0 }}
                            className="cursor-pointer"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              setAmount("");
                            }}
                          >
                            <HugeiconsIcon
                              icon={Delete03Icon}
                              className="size-5 text-red-400 hover:text-red-500 transition"
                            />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </span>
                    <div>
                      <AmountInput
                        totalVolume={
                          Number(market.binaryMarkets[0]?.totalVolume) ?? 0
                        }
                        yesVolume={Number(market.binaryMarkets[0]?.yesVolume) ?? 0}
                        selectedTrade={selectedOutcome}
                        amount={amount}
                        setAmount={setAmount}
                      />
                    </div>
                    <div className="flex gap-2">
                      {[1, 10, 100, 500].map((val) => (
                        <Button
                          key={val}
                          type="button"
                          onClick={() => {
                            setAmount((prev) => {
                              const current = Number(prev) || 0;
                              return (current + val).toString();
                            });
                          }}
                          className={cn(
                            "px-3 py-1.5 rounded-md text-sm bg-neutral-900 text-neutral-300 hover:bg-neutral-800 transition flex-1 cursor-pointer"
                          )}
                        >
                          +${val}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="px-5 pb-5">
                    <TradeBtn
                      onChainMarketId={market.binaryMarkets[0]?.onChainMarketId}
                      outcome={selectedOutcome === "yes" ? 1 : 0}
                      amount={Number(amount.replace(/,/g, ""))}
                    />
                  </div>
                </div>

                {/* Extra Markets */}
                <div className="flex flex-col gap-8">
                  {extraMarkets.map((data, index) => (
                    <ExtraMarkets
                      key={index}
                      image={data.image}
                      text={data.title}
                      chance={data.chance}
                      href={data.href}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </PageFrame>
  );
};

export const BinaryBuyPanelMobile = ({
  selected,
  setSelected,
  binaryMarket,
  yesChange1h,
}: BinaryMarketButtonsProps & {
  binaryMarket: any;
  yesChange1h: number;
}) => {
  const [amount, setAmount] = useState<string>("");

  return (
    <div className="flex md:hidden md:flex-1 flex-col gap-12">
      {/* Buy Panel */}
      <div className="border border-neutral-800 rounded-md flex flex-col">
        <div className="py-3 px-5">
          <span className="text-neutral-400 font-bold tracking-wider">Buy</span>
        </div>

        <Separator className="bg-neutral-800" />

        {/* <MarketButtons /> */}
        <BinaryMarketButtons
          selected={selected}
          setSelected={setSelected}
          yesChange1h={yesChange1h}
        />

        <div className="px-5 py-5 flex flex-col gap-3">
          <span className="text-neutral-300 text-sm">Amount</span>
          <div>
            <AmountInput
              totalVolume={Number(binaryMarket?.totalVolume) ?? 0}
              yesVolume={Number(binaryMarket?.yesVolume) ?? 0}
              selectedTrade={selected}
              amount={amount}
              setAmount={setAmount}
            />
          </div>
          <div className="flex gap-2">
            {[1, 10, 100, 500].map((val) => (
              <Button
                key={val}
                type="button"
                onClick={() => setAmount(val.toString())}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm bg-neutral-900 text-neutral-300 hover:bg-neutral-800 transition flex-1 cursor-pointer"
                )}
              >
                +${val}
              </Button>
            ))}
          </div>
        </div>

        <div className="px-5 pb-5">
          <TradeBtn
            onChainMarketId={binaryMarket?.onChainMarketId}
            outcome={selected === "yes" ? 1 : 0}
            amount={Number(amount.replace(/,/g, ""))}
          />
        </div>
      </div>
    </div>
  );
};
