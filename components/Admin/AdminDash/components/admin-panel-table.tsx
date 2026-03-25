"use client";

import { PingIndicator } from "@/components/CreateMarket/ui/ping-indicator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Delete01Icon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "@/components/CreateMarket/CreateMarketForm/components/form-toasts";

interface Moderator {
  walletAddress: string;
  username: string | null;
}

export const AdminPanelTable = () => {
  const limit = 5;

  const [moderators, setModerators] = useState<Moderator[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const fetchModerators = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/moderators?limit=${limit}&page=${page}`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error("Failed to fetch moderators");
      const data = await res.json();
      setModerators(data.moderators);
      setTotalCount(data.totalCount);
    } catch (err) {
      showErrorToast("Failed to load moderators");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModerators();
  }, [page]);

  const totalPages = Math.floor((totalCount === 0 ? 0 : totalCount - 1) / limit);

  return (
    <div
      className="relative rounded-[20px] p-[1px] bg-linear-to-br from-white/45 via-white/10 to-transparent flex-1">
      <div className="relative rounded-[20px] p-[1px] bg-linear-to-tl from-white/45 via-white/10 to-transparent flex-1">
        <div className="rounded-[20px] bg-linear-to-t from-[#0E0E0E] to-neutral-900 flex flex-col">
          <div className="grid grid-cols-[2fr_1fr] items-center p-6">
            <span className="flex gap-3 items-center">
              <span className="text-sm md:text-xl bg-linear-to-t from-[#999999] to-[#FFFFFF] bg-clip-text text-transparent font-medium">
                Admins
              </span>
              <PingIndicator color="green" />
            </span>

            <div className="flex items-center justify-end gap-2">
              <AssignDialog onSuccess={fetchModerators} />
            </div>
          </div>
          <div>
            <Separator className="bg-linear-to-l from-neutral-800 to-neutral-700" />
          </div>
          <div className="p-6 flex flex-col gap-4 min-h-44">
            {loading ? (
              <div className="flex items-center justify-center min-h-44 text-neutral-500">
                Loading...
              </div>
            ) : moderators?.length === 0 ? (
              <div className="flex items-center justify-center min-h-44 text-neutral-500">
                No moderators found
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {moderators?.map((moderator) => (
                  <AdminList
                    key={moderator.walletAddress}
                    moderator={moderator}
                    onSuccess={fetchModerators}
                  />
                ))}
                <div className="flex justify-between items-center pt-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="cursor-pointer"
                    disabled={page === 0 || loading}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </Button>

                  <span className="text-sm text-neutral-500">
                    Page {page} of {totalPages || 0}
                  </span>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="cursor-pointer"
                    disabled={page >= totalPages || loading}
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
    </div>
  );
};

interface AdminListProps {
  moderator: Moderator;
  onSuccess: () => void;
}

export const AdminList = ({ moderator, onSuccess }: AdminListProps) => {
  const displayName = moderator.username || moderator.walletAddress;
  const formatWallet = (wallet: string) =>
    `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;

  return (
    <div className="grid grid-cols-[3fr_1fr] items-center gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <p className="text-sm lg:text-lg font-medium truncate">
          <span className="hidden md:inline">{displayName}</span>
          <span className="md:hidden">
            {moderator.username || formatWallet(moderator.walletAddress)}
          </span>
        </p>
      </div>
      <div className="flex justify-end">
        <RemoveDialog
          wallet={moderator.walletAddress}
          displayName={displayName}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
};

export const AssignDialog = ({ onSuccess }: { onSuccess: () => void }) => {
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    const trimmed = wallet.trim();
    const isEVM = trimmed.startsWith("0x") && trimmed.length === 42;
    const isSolana = !trimmed.startsWith("0x") && trimmed.length >= 32 && trimmed.length <= 44;
    if (!isEVM && !isSolana) {
      showErrorToast("Please enter a valid wallet address (EVM or Solana)");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/add-moderator`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ wallet }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(errorData.message || `Request failed with status ${res.status}`);
      }

      showSuccessToast("Moderator added successfully");
      setWallet("");
      setOpen(false);
      onSuccess();
    } catch (err) {
      showErrorToast(`Failed to add moderator: ${(err as Error).message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center cursor-pointer bg-linear-to-b from-[#1C4D8D] to-[#4988C4] text-neutral-200 hover:text-white">
          Assign
          <HugeiconsIcon icon={PlusSignIcon} className="size-4.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-linear-to-b from-neutral-950 to-neutral-900 border-none">
        <DialogTitle className="text-sm">Assign Admin</DialogTitle>
        <div className="flex flex-col gap-2">
          <div className="border rounded-md border-neutral-800">
            <input
              type="text"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              className="h-10 w-full rounded-md outline-none px-3 bg-transparent placeholder:truncate placeholder:text-sm"
              placeholder="0xA1b2C3d4E5F67890123456789aBCDef012345678"
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={loading || !wallet}
            className="self-end cursor-pointer"
            variant="marketGradient"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export const RemoveDialog = ({
  wallet,
  displayName,
  onSuccess,
}: {
  wallet: string;
  displayName: string;
  onSuccess: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const formatWallet = (wallet: string) => `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;

  const handleRemove = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/moderators?wallet=${wallet}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(errorData.message || `Request failed with status ${res.status}`);
      }

      showSuccessToast("Moderator removed successfully");
      setOpen(false);
      onSuccess();
    } catch (err) {
      showErrorToast(`Failed to remove moderator: ${(err as Error).message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer flex items-center gap-2 bg-linear-to-b from-[#D25353] to-[#9E3B3B] text-neutral-200 hover:text-white">
          Remove <HugeiconsIcon icon={Delete01Icon} className="size-4.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-linear-to-b from-neutral-950 to-neutral-900 border-none">
        <DialogTitle className="text-sm">Remove Admin</DialogTitle>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-neutral-400">Wallet Address</span>

            <span className="text-sm sm:hidden font-medium">
              {formatWallet(wallet)}
            </span>

            <span className="hidden sm:block text-sm truncate" title={wallet}>
              {displayName}
            </span>
          </div>
          <div className="flex gap-3">
            <DialogClose asChild>
              <Button className="cursor-pointer flex-1" variant="noBtn" disabled={loading}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleRemove}
              disabled={loading}
              className="cursor-pointer flex-1"
              variant="newYesBtn"
            >
              {loading ? "Removing..." : "Remove"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
