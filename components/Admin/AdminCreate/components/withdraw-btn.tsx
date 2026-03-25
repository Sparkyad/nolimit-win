"use client";
import { showErrorToast, showSuccessToast } from "@/components/CreateMarket/CreateMarketForm/components/form-toasts";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export const WithdrawFundsBtn = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState(process.env.NEXT_PUBLIC_THIRDWEB_SERVER_WALLET_ADDRESS || "");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");

    if (!raw) {
      setValue("");
      return;
    }

    const formatted = Number(raw).toLocaleString("en-US");
    setValue(formatted);
  };

  const handleWithdraw = async () => {
    if (loading) return;
    if (recipient.trim().length !== 42) {
      showErrorToast("Please enter a valid wallet address.");
      return;
    }

    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/withdraw-funds`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientAddress: recipient,
          amount: value.replace(/,/g, "")
        }),
      });
      setRecipient(process.env.NEXT_PUBLIC_THIRDWEB_SERVER_WALLET_ADDRESS || "");
      setValue("");
      setDialogOpen(false);
      showSuccessToast("Withdrawal initiated!");
    }
    catch (err) {
      showErrorToast(`Failed to withdraw funds: ${(err as Error).message}`);
      console.error("Withdrawal failed:", err);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer font-semibold bg-linear-to-b from-[#F8B259] to-[#C75D2C]">
          Withdraw Funds
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-linear-to-b from-neutral-950 to-neutral-900 border-none">
        <DialogTitle>{ }</DialogTitle>
        <div className="flex flex-col gap-3">
          <span>Recipient</span>
          <div className="border rounded-md border-neutral-800">
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="h-10 w-full rounded-md outline-none px-3 bg-transparent"
              placeholder="Wallet address"
            />
          </div>
        </div>
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
            onClick={handleWithdraw}
            disabled={!value || !recipient || loading}
            className="cursor-pointer font-semibold bg-linear-to-b from-[#F8B259] to-[#C75D2C] w-full"
          >
            Withdraw Funds
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
