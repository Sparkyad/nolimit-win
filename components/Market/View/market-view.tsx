"use client";

import { MarketDetailMultipleCommentSection } from "../components/market-detail-multiple-comments";
import { SampleMultipleMarketAreaChart } from "@/components/Charts/sample-multiple-market-chart";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { MarketDetailView } from "@/components/MarketDetail/View/market-detail-view";
import { MarketButtons } from "@/components/MarketDetail/components/market-buttons";
import {
  ArrowReloadHorizontalIcon,
  Clock01Icon,
  Delete03Icon,
  Share05Icon,
} from "@hugeicons/core-free-icons";
import { ExpandedText } from "@/components/MarketDetail/components/expanded-text";
import { ExtraMarkets } from "@/components/MarketDetail/components/extra-markets";
import { AmountInput } from "@/components/MarketDetail/components/amount-input";
import { TradeBtn } from "@/components/MarketDetail/components/trade-btn";
// import { GraphPoint } from "@/components/Charts/sample-chart-two";
import { GraphPoint } from "@/components/Charts/sample-multiple-market-chart";
import { OutcomeBox } from "../components/outcome-box";
import { Separator } from "@/components/ui/separator";
import { PageFrame } from "@/components/page-frame";
import { HugeiconsIcon } from "@hugeicons/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { compute24hChange } from "@/lib/compute-24h-change";
import { AnimatePresence, motion } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LoaderView } from "@/components/Loader/loader-view";
import { showErrorToast } from "@/components/CreateMarket/CreateMarketForm/components/form-toasts";

interface Props {
  marketId: string;
}

export type SelectedTrade = {
  id: number;
  onChainMarketId: number;
  outcome: "yes" | "no";
};

export const MarketView = ({ marketId }: Props) => {
  const [market, setMarket] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentsCursor, setCommentsCursor] = useState<string | null>(null);
  const [commentsTotalCount, setCommentsTotalCount] = useState<number>(0);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [isLoadingMoreComments, setIsLoadingMoreComments] = useState(false);
  const [graph, setGraph] = useState<GraphPoint[][]>([]);
  const [noHolders, setNoHolders] = useState<any[]>([]);
  const [yesHolders, setYesHolders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState<string>("");
  const [extraMarkets, setExtraMarkets] = useState<
    {
      image: string;
      title: string;
      chance: string;
      href: string;
    }[]
  >([]);
  const [selectedTrade, setSelectedTrade] = useState<SelectedTrade | null>(
    null
  );

  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useIsMobile();
  const [copied, setCopied] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);

  const fetchComments = async (limit = 20, cursor: string | null = null): Promise<{ items: any[], nextCursor: string | null, totalCount: number }> => {
    try {
      const url = cursor
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/markets/${marketId}/comments?limit=${limit}&cursor=${cursor}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/markets/${marketId}/comments?limit=${limit}`;

      const res = await fetch(url, {
        cache: "no-store",
        credentials: "include",
      });
      if (!res.ok) return { items: [], nextCursor: null, totalCount: 0 };

      const data = await res.json();
      return { items: data.items ?? [], nextCursor: data.nextCursor ?? null, totalCount: data.totalCount ?? 0 };
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      return { items: [], nextCursor: null, totalCount: 0 };
    }
  };

  const loadMoreComments = async () => {
    if (isLoadingMoreComments || !hasMoreComments || !commentsCursor) return;

    setIsLoadingMoreComments(true);
    try {
      const { items, nextCursor, totalCount } = await fetchComments(20, commentsCursor);

      if (items.length > 0) {
        setComments(prev => [...prev, ...items]);
        setCommentsCursor(nextCursor);

        if (!nextCursor) {
          setHasMoreComments(false);
        }
      } else {
        setHasMoreComments(false);
      }
      setCommentsTotalCount(totalCount);
    } catch (err) {
      console.error("Failed to load more comments:", err);
    } finally {
      setIsLoadingMoreComments(false);
    }
  };

  const postComment = async (content: string) => {
    if (!content.trim()) return;
    if (market.status === "CLOSED" || new Date(market.minResolutionTime).getTime() < Date.now()) {
      showErrorToast("Cannot comment on closed markets.");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/markets/${marketId}/comments`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }
      );
      if (!res.ok) throw new Error("Failed to post comment");

      const newComment = await res.json();
      setComments(prev => [newComment, ...prev]);
    } catch (err) {
      console.error("Failed to post comment:", err);
      const { items, totalCount } = await fetchComments();
      setCommentsTotalCount(totalCount);
      setComments(items);
    }
  };

  useEffect(() => {
    if (!marketId) return;

    async function fetchCore() {
      try {
        const [marketRes, commentsData] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/markets/${marketId}`,
            { cache: "no-store" }
          ),
          fetchComments(20, null),
        ]);
        if (!marketRes.ok) throw new Error("Market fetch failed");

        const marketData = await marketRes.json();
        setMarket(marketData);
        setComments(commentsData.items);
        setCommentsCursor(commentsData.nextCursor);
        setHasMoreComments(!!commentsData.nextCursor);
        setCommentsTotalCount(commentsData.totalCount);

        if (marketData.binaryMarkets.length === 0) {
          setLoading(false);
          return;
        }

        setSelectedTrade({
          id: marketData.binaryMarkets[0].id,
          onChainMarketId: marketData.binaryMarkets[0].onChainMarketId,
          outcome: "yes",
        });

        const cursor = Math.floor(
          Math.random() * Math.max(0, Number(marketId) - 6)
        );
        const extraMarketsRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/markets?category=${marketData.category
          }&limit=6${cursor > 0 ? `&cursor=${cursor}` : ""}`,
          { cache: "no-store" }
        );
        const extraMarketsData = await extraMarketsRes.json();
        setExtraMarkets(
          extraMarketsData?.items
            .filter((m: any) => m.id !== marketId)
            .slice(0, 5)
            .map((m: any) => {
              const yesVolume = m.binaryMarkets[0]?.yesVolume ?? 0;
              const totalVolume = m.binaryMarkets[0]?.totalVolume ?? 0;
              const chance =
                totalVolume > 0 ? (yesVolume / totalVolume) * 100 : 0;
              return {
                image: m.imageUrl ?? "/card-images/temp.jfif",
                title: m.text,
                chance: chance.toFixed(2),
                href: `/market/${m.id}`,
              };
            }) ?? []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCore();
  }, [marketId]);

  useEffect(() => {
    async function fetchAllGraphs() {
      if (!market?.binaryMarkets) return;

      try {
        const responses = await Promise.all(
          market.binaryMarkets.map((bm: any) =>
            fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/markets/${marketId}/graph`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  onChainMarketId: bm.onChainMarketId,
                }),
                cache: "no-store",
              }
            ).then((res) => res.json())
          )
        );

        setGraph(responses);
      } catch (err) {
        console.error(err);
      }
    }

    fetchAllGraphs();
  }, [market]);

  useEffect(() => {
    async function fetchHolders() {
      if (!selectedTrade) return;
      try {
        const [yesRes, noRes] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/markets/${marketId}/holders` +
            `?binaryMarketId=${selectedTrade.onChainMarketId}` +
            `&outcomeId=1&limit=10`
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/markets/${marketId}/holders` +
            `?binaryMarketId=${selectedTrade.onChainMarketId}` +
            `&outcomeId=0&limit=10`
          ),
        ]);

        const yesData = await yesRes.json();
        const noData = await noRes.json();

        setYesHolders(yesData.items ?? []);
        setNoHolders(noData.items ?? []);
      } catch (err) {
        console.error("Failed to fetch holders", err);
      }
    }

    fetchHolders();
  }, [selectedTrade]);

  const title = market?.text;
  const resolutionDateAndTime = new Date(market?.minResolutionTime).toLocaleDateString(
    "en-US",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  const totalVolume = market?.totalVolume ?? 0;

  const selectedBinaryMarket = market?.binaryMarkets?.find((b: any) =>
    selectedTrade ? b.id === selectedTrade.id : false
  );
  const yesProb =
    Number(selectedBinaryMarket?.totalVolume) > 0
      ? Number(selectedBinaryMarket?.yesVolume) /
      Number(selectedBinaryMarket?.totalVolume)
      : 0;
  const selectedOutcomeProb =
    selectedTrade?.outcome === "yes"
      ? yesProb
      : Number(selectedBinaryMarket?.totalVolume) > 0
        ? 1 - yesProb
        : 0;

  const selectedGraph = useMemo<GraphPoint[] | undefined>(() => {
    if (!graph || graph.length === 0) return undefined;

    // SINGLE OUTCOME
    if (market?.binaryMarkets?.length === 1) {
      return graph[0];
    }

    // MULTI OUTCOME
    if (!selectedTrade) return undefined;

    const index = market.binaryMarkets.findIndex(
      (bm: any) => bm.id === selectedTrade.id
    );

    return index >= 0 ? graph[index] : undefined;
  }, [graph, market, selectedTrade]);

  const change24h = useMemo(() => {
    return compute24hChange(selectedGraph, 24);
  }, [selectedGraph, selectedTrade]);

  const yesChange1h = useMemo(() => {
    return compute24hChange(selectedGraph, 1);
  }, [selectedGraph]);

  if (loading) {
    return <LoaderView />;
  }
  if (market.binaryMarkets.length === 1) {
    return (
      <MarketDetailView
        market={market}
        graph={graph[0] ?? []}
        extraMarkets={extraMarkets}
        postComment={postComment}
        comments={comments}
        hasMoreComments={hasMoreComments}
        loadMoreComments={loadMoreComments}
        commentsTotalCount={commentsTotalCount}
        isLoadingMoreComments={isLoadingMoreComments}
        yesHolders={yesHolders}
        noHolders={noHolders}
        amount={amount}
        setAmount={setAmount}
        marketId={marketId}
      />
    );
  }

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
      <div className="p-4 lg:px-4 lg:py-10">
        <div className="flex flex-col md:flex-row gap-5 h-full">
          {/* LEFT COLUMN — SCROLLABLE */}
          <div className="flex-2 md:flex-3 flex flex-col gap-12 md:overflow-y-auto no-scrollbar">
            {/* Market Card */}
            <div className="flex flex-col p-6 gap-6 bg-neutral-900 rounded-lg">
              <div
                className={`flex ${market.videoUrl ? "flex-col" : "flex-row items-center"
                  } gap-5`}
              >
                {market.videoUrl ? (
                  <video className="h-[300px] w-full rounded-lg" loop autoPlay controls>
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
                <p className="font-semibold lg:text-2xl text-balance w-full">
                  {title}
                </p>
              </div>

              <div className="flex gap-3 text-xs text-[#C7C7C7]">
                <div className="flex gap-1 items-center">
                  <span>${totalVolume} Vol</span>
                  <HugeiconsIcon icon={ArrowReloadHorizontalIcon} size={15} />
                  <span>totally</span>
                </div>
                <HugeiconsIcon icon={Clock01Icon} size={15} />
                <span>{resolutionDateAndTime}</span>
              </div>

              <div className="flex gap-3 items-end">
                <span className="font-bold">
                  {(selectedOutcomeProb * 100).toFixed(2)}% Chance
                </span>
                <span className="text-sm">
                  <span
                    className={cn(
                      "font-semibold",
                      change24h >= 0 ? "text-emerald-400" : "text-red-400"
                    )}
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

              {/* <p className="font-semibold text-lg">Chart</p> */}
              <div>
                <SampleMultipleMarketAreaChart
                  graphData={graph}
                  selectedOutcome={selectedTrade?.outcome ?? "yes"}
                />
              </div>
            </div>

            {/* Outcomes */}
            {market.status !== "CLOSED" && new Date(market.minResolutionTime).getTime() > Date.now() && market?.binaryMarkets && selectedTrade && (
              <OutcomeBox
                outcomes={market.binaryMarkets}
                selectedTrade={selectedTrade}
                onSelectTrade={(trade) => {
                  setSelectedTrade(trade);
                  if (isMobile) setOpenDrawer(true);
                }}
              />
            )}

            {/* Rules */}
            <ExpandedText>
              <p>{selectedBinaryMarket.rules}</p>
              <span className="text-neutral-400 text-xs">
                Created At:{" "}
                {new Date(market.createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {selectedBinaryMarket.umaTxHash && (
                <a
                  href={`${process.env.NEXT_PUBLIC_UMA_ORACLE_URL?.replace(/^"|"$/g, '')}?transactionHash=${selectedBinaryMarket.umaTxHash}`}
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
              {/* RIGHT COLUMN — FIXED / STICKY */}
              <div className="hidden md:flex md:flex-1 flex-col gap-12 sticky top-6 h-fit">
                {/* Buy Panel */}
                <div className="border border-neutral-800 rounded-md flex flex-col">
                  <div className="py-3 px-5 flex justify-between">
                    <span className="text-neutral-400 font-bold tracking-wider">
                      Buy
                    </span>
                    <span>
                      {selectedTrade
                        ? (() => {
                          const text = selectedBinaryMarket.text;
                          return text && text.length > 12
                            ? `${text.slice(0, 12)}...`
                            : text ?? "";
                        })()
                        : ""}
                    </span>
                  </div>

                  <Separator className="bg-neutral-800" />

                  {selectedTrade && (
                    <MarketButtons
                      side={selectedTrade.outcome}
                      yesChange1h={yesChange1h}
                      onChange={(side) =>
                        setSelectedTrade((prev) =>
                          prev ? { ...prev, outcome: side } : prev
                        )
                      }
                    />
                  )}

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
                        amount={amount}
                        setAmount={setAmount}
                        totalVolume={Number(selectedBinaryMarket?.totalVolume) ?? 0}
                        yesVolume={Number(selectedBinaryMarket?.yesVolume) ?? 0}
                        selectedTrade={selectedTrade?.outcome ?? "yes"}
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
                      outcome={selectedTrade?.outcome === "yes" ? 1 : 0}
                      onChainMarketId={selectedTrade?.onChainMarketId}
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
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent className="bg-linear-to-t from-neutral-950 to-neutral-800 border-neutral-800 text-white">
          <DrawerHeader>
            <DrawerTitle className="flex justify-between items-center text-white">
              <span>Buy</span>
              <span className="text-sm font-semibold">
                {selectedTrade
                  ? (() => {
                    const text = selectedBinaryMarket.text;
                    return text && text.length > 12
                      ? `${text.slice(0, 12)}...`
                      : text ?? "";
                  })()
                  : ""}
              </span>
            </DrawerTitle>
          </DrawerHeader>
          {selectedTrade && (
            <MarketButtons
              side={selectedTrade.outcome}
              yesChange1h={yesChange1h}
              onChange={(side) =>
                setSelectedTrade((prev) =>
                  prev ? { ...prev, outcome: side } : prev
                )
              }
            />
          )}
          <div className="px-5 py-4 flex flex-col gap-3">
            <span className="text-neutral-300 text-sm">Amount</span>
            <div>
              <AmountInput
                amount={amount}
                setAmount={setAmount}
                totalVolume={Number(selectedBinaryMarket?.totalVolume) ?? 0}
                yesVolume={Number(selectedBinaryMarket?.yesVolume) ?? 0}
                selectedTrade={selectedTrade?.outcome ?? "yes"}
              />
            </div>
          </div>
          <div className="px-5 pb-6">
            <TradeBtn
              outcome={selectedTrade?.outcome === "yes" ? 1 : 0}
              onChainMarketId={selectedTrade?.onChainMarketId}
              amount={Number(amount.replace(/,/g, ""))}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </PageFrame>
  );
};
