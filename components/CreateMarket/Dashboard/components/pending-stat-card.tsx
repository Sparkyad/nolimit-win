"use client";

import { useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { PingIndicator } from "../../ui/ping-indicator";
import { PendingEndDateListData } from "../data/end-date-list";
import { EndDateList } from "./end-date-list";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 3;

export const PendingStatCard = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(PendingEndDateListData.length / PAGE_SIZE);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return PendingEndDateListData.slice(start, end);
  }, [page, PendingEndDateListData]);

  return (
    <div
      className="relative rounded-[20px] p-[1px] 
      bg-linear-to-br from-white/45 via-white/10 to-transparent flex-1"
    >
      <div className="rounded-[20px] bg-linear-to-t from-[#0E0E0E] to-neutral-900 flex flex-col">
        <div className="flex items-center p-6">
          <span className="flex gap-3 items-center flex-1">
            <span className="text-sm md:text-xl bg-linear-to-t from-[#999999] to-[#FFFFFF] bg-clip-text text-transparent font-medium">
              Pending Market
            </span>
            <PingIndicator color="yellow" />
          </span>

          <span className="text-neutral-500 text-sm leading-tight hidden md:block">
            End Date
          </span>
        </div>

        <Separator className="bg-linear-to-l from-neutral-800 to-neutral-700" />

        <div className="p-6 flex flex-col gap-4 min-h-44">
          {/* {paginatedData.map((data, index) => (
            <EndDateList
              key={index}
              img={data.img}
              title={data.title}
              endDate={data.endDate}
            />
          ))} */}

          {totalPages > 1 && (
            <div className="w-full pt-4">
              <div className="flex items-center justify-between">
                <Button
                  className="cursor-pointer"
                  size="sm"
                  variant="ghost"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>

                <span className="text-sm text-neutral-500">
                  Page {page} of {totalPages}
                </span>

                <Button
                  className="cursor-pointer"
                  size="sm"
                  variant="ghost"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
