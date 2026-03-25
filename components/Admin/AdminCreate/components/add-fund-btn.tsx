"use client";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/CreateMarket/CreateMarketForm/components/form-toasts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { useWallet } from "@solana/wallet-adapter-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { useAdminStoreForUsdc } from "@/store/useAdminStore";

export const AddFundsBtn = () => {
  const { publicKey: walletPublicKey, signTransaction, connected } = useWallet();
  const usdcBal = useAdminStoreForUsdc((s) => s.usdcBal);
  const setUsdcBal = useAdminStoreForUsdc((s) => s.setUsdcBal);

  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");

    if (!raw) {
      setValue("");
      return;
    }

    const formatted = Number(raw).toLocaleString("en-US");
    setValue(formatted);
  };

  const handleAddFunds = async () => {
    if (!walletPublicKey) return;
    setLoading(true);
    try {
      const amount = value.replace(/,/g, "");
      // TODO: Implement Solana SPL token transfer for admin fund deposit
      showSuccessToast("Funds added successfully!");
      setUsdcBal((Number(usdcBal) + Number(amount)).toString());
      setIsOpen(false);
      setValue("");
    } catch (error) {
      showErrorToast(`Failed to add funds: ${(error as Error).message}`);
      console.error("Error adding funds:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer font-semibold flex items-center gap-1 bg-linear-to-b from-[#F39F9F] to-[#B95E82]">
          Add Funds
          <HugeiconsIcon icon={Add01Icon} className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-linear-to-b from-neutral-950 to-neutral-900 border-none">
        <DialogTitle>{}</DialogTitle>
        <div className="flex flex-col gap-3">
          <span>Amount</span>
          <div className="border rounded-md border-neutral-800">
            <input
              value={value ? `$${value}` : ""}
              onChange={handleChange}
              type="text"
              className="h-10 w-full rounded-md outline-none px-3 text-right font-bold"
              placeholder="$0"
            />
          </div>
        </div>
        <div>
          <Button
            onClick={handleAddFunds}
            disabled={!value || loading}
            className="cursor-pointer font-semibold flex items-center w-full gap-1 bg-linear-to-b from-[#F39F9F] to-[#B95E82]"
          >
            Add Funds
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 ml-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <HugeiconsIcon icon={Add01Icon} className="size-5" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
