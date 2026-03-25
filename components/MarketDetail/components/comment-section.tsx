"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { easeIn, motion } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";

type Holder = {
  rank: number;
  totalVolume: number;
  user: {
    username: string | null;
    avatarUrl: string | null;
    walletAddress: string;
  };
};

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    username: string | null;
    avatarUrl: string | null;
    walletAddress: string;
  };
};

type Props = {
  comments: Comment[];
  postComment: (content: string) => Promise<void>;
  yesHolders: Holder[];
  noHolders: Holder[];
};

export const MarketDetailCommentSection = ({
  comments,
  postComment,
  yesHolders,
  noHolders,
}: Props) => {
  const [activeTab, setActiveTab] = useState<"comments" | "holders">(
    "comments"
  );

  return (
    <div>
      <div className="flex gap-8 text-sm font-semibold">
        <button
          onClick={() => setActiveTab("comments")}
          className={cn(
            activeTab === "comments"
              ? "text-white border-b-2"
              : "text-neutral-600 border-b-2 border-[#0C0C0C]",
            "cursor-pointer pb-2"
          )}
        >
          Comments <span>({comments.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("holders")}
          className={cn(
            activeTab === "holders"
              ? "text-white border-b-2"
              : "text-neutral-600 border-b-2 border-[#0C0C0C]",
            "cursor-pointer pb-2"
          )}
        >
          Top Holders
        </button>
      </div>

      <Separator className="bg-neutral-800" />

      <div className="mt-5">
        {activeTab === "comments" && (
          <Comments comments={comments} postComment={postComment} />
        )}
        {activeTab === "holders" && (
          <TopHolders yesHolders={yesHolders} noHolders={noHolders} />
        )}
      </div>
    </div>
  );
};

const commentVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: easeIn,
    },
  },
};

export const Comments = ({
  comments,
  postComment,
}: {
  comments: Comment[];
  postComment: (content: string) => Promise<void>;
}) => {
  const [commentText, setCommentText] = useState("");

  return (
    <div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
          className="border border-neutral-800 rounded-lg w-full p-3 lg:p-4 outline-none placeholder:text-sm"
        />
        <div className="self-end">
          <Button
            onClick={async () => {
              await postComment(commentText);
              setCommentText("");
            }}
            variant="marketGradient"
            className="md:px-8 cursor-pointer text-neutral-400 hover:text-white transition duration-200 ease-in-out"
          >
            Post
          </Button>
        </div>
      </div>

      <ScrollArea className={cn("mt-6", comments.length > 1 && "h-48")}>
        <div className="lg:px-4 flex flex-col gap-6 lg:gap-8">
          {comments.length === 0 && (
            <p className="text-sm text-neutral-400">No comments yet</p>
          )}

          {comments.map((comment) => {
            const username =
              comment.user.username ??
              `${comment.user.walletAddress.slice(
                0,
                6
              )}...${comment.user.walletAddress.slice(-4)}`;

            return (
              <motion.div
                key={comment.id}
                variants={commentVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  margin: "-40px",
                }}
                className="flex items-start gap-4"
              >
                {/* Avatar */}
                <div className="w-10 h-10 shrink-0">
                  <Link href={`/portfolio/${comment.user.walletAddress}`}>
                    <img
                      src={
                        comment.user.avatarUrl ?? "/UserImage/gradient.avif"
                      }
                      alt="avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </Link>
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2 min-w-0">
                  <Link
                    href={`/portfolio/${comment.user.walletAddress}`}
                    className="text-sm font-bold flex gap-2 flex-wrap"
                  >
                    {username}
                    <span className="text-xs text-neutral-400 font-normal">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </Link>

                  <p className="text-sm leading-relaxed break-words">
                    {comment.content}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export const TopHolders = ({
  yesHolders,
  noHolders,
}: {
  yesHolders: Holder[];
  noHolders: Holder[];
}) => {
  return (
    <div className="border border-neutral-800 rounded-md divide-x divide-neutral-800 flex">
      <HoldersColumn title="Yes Holders" color="green" data={yesHolders} />
      <HoldersColumn title="No Holders" color="red" data={noHolders} />
    </div>
  );
};

const HoldersColumn = ({
  title,
  color,
  data,
}: {
  title: string;
  color: "green" | "red";
  data: Holder[];
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="flex-1 p-4 lg:p-6 min-w-0">
      <div className="flex justify-between items-center">
        <span className="font-normal lg:font-bold">{title}</span>
        <span className="hidden lg:block text-xs text-neutral-300">SHARES</span>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {data.length === 0 && (
          <p className="text-sm text-neutral-500">No holders yet</p>
        )}

        {data.map((h) => {
          const name_mb =
            h.user.username ??
            `${h.user.walletAddress.slice(0, 3)}...${h.user.walletAddress.slice(
              -4
            )}`;

          const name_dkt =
            h.user.username ??
            `${h.user.walletAddress.slice(0, 6)}...${h.user.walletAddress.slice(
              -4
            )}`;

          const shares = (h.totalVolume ?? 0).toLocaleString();

          return (
            <motion.div
              key={h.rank}
              variants={commentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                margin: "-40px",
              }}
              className="flex justify-between items-center"
            >
              <Link
                href={`/portfolio/${h.user.walletAddress}`}
                className="flex gap-4 items-center"
              >
                <img
                  src={h.user.avatarUrl ?? "/UserImage/gradient.avif"}
                  className="md:w-9 md:h-9 w-7 h-7 rounded-full object-cover shrink-0"
                />
                <span className="text-[14px] md:text-[16px]">
                  {isMobile ? name_mb : name_dkt}

                  <span
                    className={cn(
                      "block lg:hidden text-[13px]",
                      color === "green" ? "text-emerald-500" : "text-red-400"
                    )}
                  >
                    {shares} shares
                  </span>
                </span>
              </Link>

              <span
                className={cn(
                  "hidden lg:block text-[15px]",
                  color === "green" ? "text-emerald-500" : "text-red-400"
                )}
              >
                {shares}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
