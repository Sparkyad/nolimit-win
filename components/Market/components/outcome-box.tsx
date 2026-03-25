"use client";

import { SelectedTrade } from "@/components/Market/View/market-view";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface Outcome {
  id: number;
  question: string;
  text: string;
  totalVolume: string;
  yesVolume: string;
}

interface OutcomeBoxProps {
  outcomes: Outcome[];
  selectedTrade: SelectedTrade;
  onSelectTrade: (trade: SelectedTrade) => void;
}

export const OutcomeBox = ({
  outcomes,
  selectedTrade,
  onSelectTrade,
}: OutcomeBoxProps) => {
  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_320px] text-sm text-neutral-400 items-center">
        <span>Outcome</span>
        <span className="flex justify-end md:block">Chances</span>
        <span></span>
        <span className="text-right hidden md:block">Action</span>
      </div>

      <Separator className="bg-neutral-800" />

      {/* Rows */}
      <div className="flex flex-col gap-2">
        {outcomes.map((outcome) => {
          const isSelected = selectedTrade.id === outcome.id;

          return (
            <div
              key={outcome.id}
              onClick={() => {
                onSelectTrade({
                  ...selectedTrade,
                  id: outcome.id,
                  outcome: "yes",
                });
              }}
              className={`flex flex-col gap-3 py-2 rounded-md transition-colors cursor-pointer ${
                isSelected ? "bg-neutral-900" : ""
              }`}
            >
              {/* Main Row */}
              <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_320px] items-end md:items-center">
                {/* Outcome */}
                <div className="text-white font-semibold flex flex-col gap-1 pl-2">
                  {outcome.text.length > 15
                    ? outcome.text.slice(0, 15) + "..."
                    : outcome.text}
                  <span className="text-xs text-neutral-500">
                    ${Number(outcome.totalVolume).toLocaleString()} Vol
                  </span>
                </div>

                {/* Chance (static for now) */}
                <div className="text-xl font-bold text-emerald-500 tabular-nums text-center md:text-left">
                  {Number(outcome.totalVolume) > 0
                    ? (
                        (Number(outcome.yesVolume) /
                          Number(outcome.totalVolume)) *
                        100
                      ).toFixed(2)
                    : "0.00"}
                  %
                </div>

                <div className="hidden md:block" />

                {/* Desktop Actions */}
                <div className="hidden md:flex justify-end gap-3 pr-2">
                  <Button
                    variant="newYesBtn"
                    className="w-[120px] py-5 text-xs md:text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTrade({
                        ...selectedTrade,
                        id: outcome.id,
                        outcome: "yes",
                      });
                    }}
                  >
                    Buy Yes
                  </Button>

                  <Button
                    variant="newNoBtn"
                    className="w-[120px] py-5 text-xs md:text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTrade({
                        ...selectedTrade,
                        id: outcome.id,
                        outcome: "no",
                      });
                    }}
                  >
                    Buy No
                  </Button>
                </div>
              </div>

              {/* Mobile / Tablet Actions */}
              <div className="flex md:hidden gap-2 px-2">
                <Button
                  variant="newYesBtn"
                  className="flex-1 py-4 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTrade({
                      ...selectedTrade,
                      id: outcome.id,
                      outcome: "yes",
                    });
                  }}
                >
                  Buy Yes
                </Button>

                <Button
                  variant="newNoBtn"
                  className="flex-1 py-4 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTrade({
                      ...selectedTrade,
                      id: outcome.id,
                      outcome: "no",
                    });
                  }}
                >
                  Buy No
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
