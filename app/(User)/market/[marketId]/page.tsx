import { MarketView } from "@/components/Market/View/market-view";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import React from "react";

interface Props {
  params: Promise<{ marketId: string }>;
}

async function getMarket(marketId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/markets/${marketId}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data = await res.json();
  // console.log("MarketData", data);

  return data;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const marketId = (await params).marketId;
  const market = await getMarket(marketId);

  if (!market) {
    return {
      title: "Market not found | NoLimit",
      description: "This market does not exist.",
    };
  }

  // Format end date for previews
  const endsAt = new Date(market.minResolutionTime).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  const previewTitle = market.text;
  const previewDescription = `Ends ${endsAt}`;

  const url = `https://nolimit.com/market/${marketId}`;

  return {
    // Browser tab
    title: `${previewTitle} | NoLimit`,
    description: previewDescription,

    // WhatsApp, Telegram, Slack, Discord, LinkedIn
    openGraph: {
      title: previewTitle,
      description: previewDescription,
      url,
      siteName: "NoLimit",
      type: "website",
      images: [
        {
          url: market.imageUrl,
          width: 1200,
          height: 630,
          alt: previewTitle,
        },
      ],
    },

    // Twitter / X
    twitter: {
      card: "summary_large_image",
      title: previewTitle,
      description: previewDescription,
      images: [market.imageUrl],
    },
  };
}

async function Page({ params }: Props) {
  const { marketId } = await params;
  const market = await getMarket(marketId);

  if (!market) {
    redirect("/");
  }

  return (
    <div className="mb-32 md:mb-0">
      <MarketView marketId={marketId} />
    </div>
  );
}

export default Page;
