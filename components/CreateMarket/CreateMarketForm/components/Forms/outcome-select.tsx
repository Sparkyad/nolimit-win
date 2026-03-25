"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Delete01Icon, PlusSignSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { MarketFormData } from "../../View/create-market-view";
import { showErrorToast } from "../form-toasts";

export const OutcomeSelect = ({
  data,
  setData,
  isAdminOrMod,
}: {
  data: MarketFormData;
  setData: React.Dispatch<React.SetStateAction<MarketFormData>>;
  isAdminOrMod: boolean;
}) => {
  const isMultiple = data.outcomes.length >= 2;
  const maxReached = !isAdminOrMod && data.outcomes.length >= 4;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-neutral-300 font-medium tracking-wider">
        Outcomes
      </span>

      <div className="max-w-96 flex justify-between">
        <div className="w-52 flex border-2 rounded-xl border-neutral-800 bg-neutral-900 p-0.5">
          {/* Binary */}
          <button
            onClick={() =>
              setData({
                ...data,
                outcomes: [],
              })
            }
            className={cn(
              !isMultiple && "bg-neutral-700 text-neutral-100",
              "flex-1 rounded-lg py-2 text-sm font-semibold cursor-pointer"
            )}
          >
            Binary
          </button>

          {/* Multiple */}
          <button
            onClick={() =>
              setData({
                ...data,
                outcomes: data.outcomes.length >= 2 ? data.outcomes : ["", ""],
              })
            }
            className={cn(
              isMultiple && "bg-neutral-700 text-neutral-100",
              "flex-1 rounded-lg py-2 text-sm font-semibold cursor-pointer"
            )}
          >
            Multiple
          </button>
        </div>

        {isMultiple && (
          <HugeiconsIcon
            onClick={() => {
              if (maxReached) {
                showErrorToast("Only 4 outcomes are allowed.");
                return;
              }
              setData({
                ...data,
                outcomes: [...data.outcomes, ""],
              });
            }}
            icon={PlusSignSquareIcon}
            className="text-neutral-300 cursor-pointer"
            size={30}
          />
        )}
      </div>

      <div className="mt-4">
        {!isMultiple && <BinaryOutputs />}
        {isMultiple && <MultipleOutputs data={data} setData={setData} />}
      </div>
    </div>
  );
};

export const BinaryOutputs = () => {
  return (
    <div className="flex gap-2">
      <Button variant="newYesBtn" className="px-10">
        Yes
      </Button>
      <Button variant="newNoBtn" className="px-10">
        No
      </Button>
    </div>
  );
};

export const MultipleOutputs = ({
  data,
  setData,
}: {
  data: MarketFormData;
  setData: React.Dispatch<React.SetStateAction<MarketFormData>>;
}) => {
  return (
    <div className="flex flex-col gap-3">
      {data.outcomes.map((outcome, i) => {
        return (
          <span key={i} className="relative max-w-96">
            <input
              value={outcome}
              onChange={(e) => {
                const newOutcomes = [...data.outcomes];
                newOutcomes[i] = e.target.value;
                setData({ ...data, outcomes: newOutcomes });
              }}
              type="text"
              className="
            border w-full rounded-xl border-neutral-800
            outline-none py-2 px-2
            bg-[#262626]
            inset-shadow-neutral-500
            placeholder:text-neutral-600
          "
            />
            <div>
              {/* <button
                type="button"
                className="
              absolute right-10 top-1/2 -translate-y-1/2
              rounded-md p-1
              text-neutral-600
              cursor-pointer
              "
              >
                <Pen size={16} />
              </button> */}
              <button
                type="button"
                onClick={() => {
                  const newOutcomes = data.outcomes.filter(
                    (_, index) => index !== i
                  );
                  if (newOutcomes.length < 2) {
                    newOutcomes.push("");
                  }
                  setData({ ...data, outcomes: newOutcomes });
                }}
                className="
              absolute right-3 top-1/2 -translate-y-1/2
              rounded-md p-1
              text-neutral-600
              cursor-pointer
              "
              >
                <HugeiconsIcon
                  icon={Delete01Icon}
                  size={18}
                  className="text-[#AF3E3E]"
                />
              </button>
            </div>
          </span>
        );
      })}{" "}
    </div>
  );
};
