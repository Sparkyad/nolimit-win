"use client";

import { AnalyticsUpIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon, IconSvgElement } from "@hugeicons/react";
import { Separator } from "../ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { categories } from "@/constants";

const TABS: {
  key: string;
  label: string;
  icon?: IconSvgElement;
}[] = [
    { key: "trending", label: "Trending", icon: AnalyticsUpIcon },
    ...categories.map((category) => ({ key: category, label: category.charAt(0).toUpperCase() + category.slice(1) })),
  ];

interface Props {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export const CategoryTabs = ({
  activeCategory,
  setActiveCategory,
}: Props) => {
  const isMobile = useIsMobile();

  const renderTabs = () =>
    TABS.map((tab) => {
      const isActive = activeCategory === tab.key;

      return (
        <div key={tab.key} className="flex items-center gap-3">
          <span
            onClick={() => {
              if (!isActive) setActiveCategory(tab.key);
            }}
            className={`flex items-center gap-2 cursor-pointer tracking-wide transition-colors
              ${isActive
                ? "text-white"
                : "text-[#C7C7C7] hover:text-white"
              }
            `}
          >
            {tab.icon && (
              <span
                className={
                  isActive ? "text-emerald-400" : "text-[#8A8A8A]"
                }
              >
                <HugeiconsIcon icon={tab.icon} size={24} />
              </span>
            )}
            {tab.label}
          </span>

          {tab.key === "trending" && (
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-4 bg-[#6E6E6E]"
            />
          )}
        </div>
      );
    });

  return (
    <div>
      {!isMobile && (
        <div className="flex gap-3 items-center text-sm overflow-x-auto">
          {renderTabs()}
        </div>
      )}

      {isMobile && (
        <ScrollArea>
          <div className="flex gap-4 items-center text-xs">
            {renderTabs()}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};
