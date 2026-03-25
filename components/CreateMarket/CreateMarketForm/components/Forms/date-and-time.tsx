"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { generateTimes } from "@/utils/generate-times";
import { MarketFormData } from "../../View/create-market-view";

export const DateAndTime = ({
  data,
  setData,
}: {
  data: MarketFormData;
  setData: React.Dispatch<React.SetStateAction<MarketFormData>>;
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("09:00");

  useEffect(() => {
    if (!data.closeTime) return;

    setDate(new Date(data.closeTime));
    setTime(new Date(data.closeTime).toTimeString().slice(0, 5));
  }, [data.closeTime]);
  useEffect(() => {
    if (!date || !time) return;

    const [hours, minutes] = time.split(":").map(Number);
    const closeTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );
    if (closeTime.toISOString() !== data.closeTime?.toISOString()) {
      setData((prev) => ({
        ...prev,
        closeTime: closeTime,
      }));
    }
  }, [date, time, setData]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-neutral-300 font-medium tracking-wider">
        End Date
      </span>

      <div className="max-w-96">
        <div className="flex gap-3">
          <div className="flex-2">
            <PopoverDatePicker date={date} setDate={setDate} />
          </div>
          <div className="flex-1">
            <EndTimePopover time={time} setTime={setTime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const PopoverDatePicker = ({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date) => void;
}) => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="flex w-full justify-start">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-full max-w-96 justify-start rounded-xl",
              "bg-[#262626] border border-neutral-800 cursor-pointer",
              "px-4 py-3 text-sm font-normal",
              "text-neutral-300",
              !date && "text-neutral-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-neutral-400" />
            {date ? format(date, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-auto rounded-xl border border-neutral-800 bg-[#1b1b1b] p-3 shadow-xl"
        >
          <Calendar
            key={date?.toISOString()}
            mode="single"
            required
            selected={date}
            defaultMonth={date}
            onSelect={(d) => d && setDate(d)}
            className="text-neutral-200"
            captionLayout="dropdown"
            fromYear={currentYear - 7}
            toYear={currentYear + 7}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export const EndTimePopover = ({
  time,
  setTime,
}: {
  time: string;
  setTime: (time: string) => void;
}) => {
  const TIME_OPTIONS = generateTimes(15); // every 15 min

  return (
    <div className="flex w-full justify-start">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "w-full max-w-96 justify-start rounded-xl",
              "bg-[#262626] border border-neutral-800 cursor-pointer",
              "px-4 py-3 text-sm font-normal",
              "text-neutral-300"
            )}
          >
            {time}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="
            w-auto rounded-xl border border-neutral-800
            bg-[#1b1b1b] p-3 shadow-xl
          "
        >
          <div className="max-h-64 overflow-y-auto flex flex-col no-scrollbar">
            {TIME_OPTIONS.map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={cn(
                  "w-full rounded-md px-3 py-2 text-left text-sm",
                  "text-neutral-300 hover:bg-neutral-800",
                  t === time && "bg-neutral-800"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
