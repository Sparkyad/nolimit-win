"use client";

// import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MarketFormData } from "../../View/create-market-view";
import { categories } from "@/constants";

export const CategorySelect = ({ data, setData }: { data: MarketFormData, setData: React.Dispatch<React.SetStateAction<MarketFormData>> }) => {
  //   const [mounted, setMounted] = useState(false);

  //   useEffect(() => {
  //     setMounted(true);
  //   }, []);

  //   if (!mounted) return null;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-neutral-300 font-medium tracking-wider">
        Category
      </span>
      <div className="max-w-96">
        <Select onValueChange={(value) => setData({ ...data, category: value as MarketFormData['category'] })} value={data.category}>
          <SelectTrigger className="w-full bg-[#262626] border-none outline-none py-4 px-2 rounded-xl">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
