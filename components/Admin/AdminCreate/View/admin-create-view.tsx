"use client";

import { TitleForm } from "@/components/CreateMarket/CreateMarketForm/components/Forms/title-form";
import { AdminPageFrame } from "../../ui/admin-page-frame";
import { DescriptionForm } from "@/components/CreateMarket/CreateMarketForm/components/Forms/description-form";
import {
  ThumbnailDropzone,
} from "@/components/CreateMarket/CreateMarketForm/components/Forms/thumbnail";
import { VideoUpload } from "@/components/CreateMarket/CreateMarketForm/components/Forms/video-upload";
import { DateAndTime } from "@/components/CreateMarket/CreateMarketForm/components/Forms/date-and-time";
import { OutcomeSelect } from "@/components/CreateMarket/CreateMarketForm/components/Forms/outcome-select";
import { CategorySelect } from "@/components/CreateMarket/CreateMarketForm/components/Forms/category-select";
import { SubmitBtns } from "@/components/CreateMarket/CreateMarketForm/components/Forms/submit-btns";
import { MarketFormData } from "@/components/CreateMarket/CreateMarketForm/View/create-market-view";
import { categories } from "@/constants";
import { useState } from "react";
import { useAdminStore } from "@/store/useAdminStore";

export const AdminCreateView = () => {
  const { role, loading } = useAdminStore();
  const [data, setData] = useState<MarketFormData>({
    question: "",
    rules: "",
    category: categories[0],
    outcomes: [],
    //: Placeholder image URL
    imageUrl: "https://deadline.com/wp-content/uploads/2022/08/GettyImages-1359449253.jpg?w=681&h=383&crop=1",
    closeTime: null,
  });

  if (loading) return <div>Loading...</div>;

  return (
    <AdminPageFrame>
      <div className="flex flex-col gap-10 md:gap-20 min-h-screen">
        <div className="flex justify-center pt-5">
          <div className="flex flex-col gap-1 items-center">
            <p className="font-bold text-2xl md:text-4xl bg-linear-to-b from-neutral-300 to-neutral-600 bg-clip-text text-transparent">
              Hello, Ariana!
            </p>
            <span className="text-sm md:text-lg font-light tracking-wider text-neutral-400 flex items-center gap-2">
              <span>Let’s create a new market</span>
              <span>
                <img src="/Admin/Form/herb.avif" alt="herb" className="w-6" />
              </span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto w-full gap-8 px-10 md:px-5 lg:px-0 pb-4">
          <div className="flex flex-col gap-8 md:px-8 md:py-6">
            <TitleForm data={data} setData={setData} />
            <DescriptionForm data={data} setData={setData} />
            <CategorySelect data={data} setData={setData} />
            <ThumbnailDropzone data={data} setData={setData} />
          </div>

          <div className="flex flex-col gap-8 md:px-8 md:py-6">
            <VideoUpload data={data} setData={setData} />
            <DateAndTime data={data} setData={setData} />
            <OutcomeSelect data={data} setData={setData} isAdminOrMod={role === "admin" || role === "moderator"} />
            <SubmitBtns data={data} />
          </div>
        </div>
      </div>
    </AdminPageFrame>
  );
};
