import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CoinsDollarIcon, Delete03Icon } from "@hugeicons/core-free-icons";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { ShimmerButton } from "../ui/shimmer-button";
import {
  showBigSuccessToast,
  showErrorToast,
  showSuccessToast,
} from "../CreateMarket/CreateMarketForm/components/form-toasts";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { getUsdcBalance } from "@/lib/solanaTrade";
import { useAdminStore } from "@/store/useAdminStore";
import confetti from "canvas-confetti";

const MAX_MARKETS = 25;

const fireConfetti = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};

export const DegenBetting = () => {
  const { publicKey, connected, signTransaction } = useWallet();
  const { setVisible } = useWalletModal();

  const checkAdmin = useAdminStore((state) => state.checkAdmin);

  const MAX_DIGITS = 9;
  const MAX_AMOUNT = 999_999_999;

  const [pending, setPending] = useState(false);
  const [amount, setAmount] = useState("");
  const [markets, setMarkets] = useState("");
  const [strategy, setStrategy] = useState("lucky");
  const [shake, setShake] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setAmount("");
      setMarkets("");
      return;
    }

    if (!/^\d+$/.test(value)) return;

    if (value.length > MAX_DIGITS) {
      triggerShake();
      return;
    }

    const numericValue = Number(value);

    if (numericValue > MAX_AMOUNT) {
      triggerShake();
      return;
    }

    setAmount(value);

    if (Number(markets) > numericValue) {
      setMarkets(String(numericValue));
    }
  };

  const addQuickAmount = (value: number) => {
    setAmount((prev) => {
      const current = Number(prev) || 0;
      const next = current + value;

      if (next > MAX_AMOUNT || String(next).length > MAX_DIGITS) {
        triggerShake();
        return prev;
      }

      if (Number(markets) > next) {
        setMarkets(String(next));
      }

      return String(next);
    });
  };

  const handleMarketsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setMarkets("");
      return;
    }

    if (!/^\d+$/.test(value)) return;

    const numericMarkets = Number(value);
    const numericAmount = Number(amount) || 0;

    if (numericMarkets > MAX_MARKETS) {
      showErrorToast("Max 25 markets allowed in Degen mode");
      triggerShake();
      return;
    }

    if (numericMarkets > numericAmount) {
      triggerShake();
      return;
    }

    setMarkets(value);
  };

  const handleBet = async () => {
    if (!publicKey || !connected) {
      showErrorToast("Please connect your wallet to place a bet");
      setVisible(true);
      return;
    }

    const numericAmount = Number(amount);
    const numericMarkets = Number(markets);

    if (numericMarkets > 25) {
      showErrorToast("Degen mode supports up to 25 markets only");
      return;
    }

    if (!numericAmount || numericAmount <= 0) {
      showErrorToast("Enter a valid bet amount");
      return;
    }

    if (!numericMarkets || numericMarkets <= 0) {
      showErrorToast("Enter a valid number of markets");
      return;
    }

    if (numericMarkets > numericAmount) {
      showErrorToast("Markets cannot be greater than amount");
      return;
    }

    if (!strategy) {
      showErrorToast("Select a betting strategy");
      return;
    }

    try {
      setPending(true);
      if ((await getUsdcBalance(publicKey.toBase58())) < BigInt(Number(amount) * 1_000_000)) {
        // fireConfetti();
        showErrorToast("Insufficient USDC balance");
        // setDialogOpen(false)
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/markets/degen-bet`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            position: strategy,
            marketCount: numericMarkets,
            amount: amount,
          }),
        }
      );
      if (!res.ok) {
        showErrorToast("Betting failed: " + (await res.text()));
        return;
      }

      // showSuccessToast("Bet scheduled successfully 🎲🔥");
      showBigSuccessToast("Your degen bet has been placed successfully 🎲🔥");

      fireConfetti();
      setAmount("");
      setMarkets("");
      setStrategy("lucky");
      setDialogOpen(false);
    } catch (error) {
      showErrorToast("Betting failed: " + (error as Error).message);
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger
        onClick={async () => {
          if (!connected) {
            setVisible(true);
          }
          return;
        }}
        asChild
      >
        <div className="inline-flex p-1">
          <ShimmerButton className="lg:px-6 px-3 py-3 rounded-lg text-xs md:text-sm cursor-pointer flex gap-2 items-center">
            Degen Mode
            <HugeiconsIcon icon={CoinsDollarIcon} size={20} />
          </ShimmerButton>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-neutral-900 border-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            Spark it up{" "}
            <img
              src="/CreateMarket/Form/bolt.png"
              alt="bolt-png"
              className="w-3"
            />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Bet Amount */}
          <div className="space-y-1 flex flex-col gap-2">
            <label className="text-sm text-muted-foreground flex justify-between">
              Bet Amount
              <AnimatePresence>
                {amount && (
                  <motion.button
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 100 }}
                    exit={{ x: 10, opacity: 0 }}
                    className="cursor-pointer"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setAmount("");
                      setMarkets("");
                    }}
                  >
                    <HugeiconsIcon
                      icon={Delete03Icon}
                      className="size-5 text-red-400 hover:text-red-500 transition"
                    />
                  </motion.button>
                )}
              </AnimatePresence>
            </label>

            <Input
              type="text"
              inputMode="numeric"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
              className={cn(
                "border-neutral-800 transition",
                shake && "animate-shake border-red-500"
              )}
            />

            <div className="flex gap-2 mt-1">
              {[10, 20, 50, 100, 500].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => addQuickAmount(val)}
                  className="flex-1 px-3 py-2 cursor-pointer rounded-md text-xs font-medium
                  bg-neutral-800 hover:bg-neutral-700
                  text-neutral-200 transition"
                >
                  +{val}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Markets */}
          <div className="space-y-1 flex flex-col gap-2">
            <label className="text-sm text-muted-foreground">
              Number of Markets
            </label>

            <Input
              type="text"
              inputMode="numeric"
              placeholder="Enter number of markets"
              value={markets}
              onChange={handleMarketsChange}
              className={cn(
                "border-neutral-800 transition",
                shake && "animate-shake border-red-500"
              )}
            />

            <p className="text-xs text-neutral-500">
              Max {Math.min(Number(amount) || 0, 25)} markets · Evenly spread wagers
            </p>
          </div>

          {/* Strategy */}
          <div className="space-y-1 flex flex-col gap-2">
            <label className="text-sm text-muted-foreground">Strategy</label>
            <Select value={strategy} onValueChange={setStrategy}>
              <SelectTrigger className="border-neutral-800">
                <SelectValue placeholder="Select strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">✔ All Yes</SelectItem>
                <SelectItem value="lucky">🎲 Feeling Lucky</SelectItem>
                <SelectItem value="no">✖ All No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* BET */}
          <Button
            variant="marketGradient"
            className="w-full mt-2 rounded-2xl cursor-pointer py-6"
            onClick={handleBet}
            disabled={!amount || !markets || pending}
          >
            BET
            {pending && "TING..."}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
