"use client";

import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
// Solana auth replaces thirdweb
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { useAdminStore } from "@/store/useAdminStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSolanaAuth } from "@/hooks/useSolanaAuth";

export const Header = () => {
  const { publicKey, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const router = useRouter();
  const { isLoggedIn, doLogin } = useSolanaAuth();
  const [country, setCountry] = useState<string | null>(null);
  const isUS = country === "US";
  useEffect(() => {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith("country="));

    setCountry(match ? match.split("=")[1] : null);
  }, []);

  const checkAdmin = useAdminStore((state) => state.checkAdmin);


  return (
    <>
      {isUS && (
        <div className="bg-[#151515] p-3 block md:hidden rounded-b-2xl">
          <p className="text-balance text-center leading-snug text-orange-300">
            You're in a restricted region. Trading is unavailable in your
            location.
          </p>
        </div>
      )}
      <div>
        <header className="hidden md:flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14 pt-2 lg:pt-6 lg:pr-4 px-2 lg:px-0 lg:mb-10">
          <div className="flex items-center w-full">
            <div className="hidden md:flex items-center gap-2 pl-4 pr-3">
              <>
                <SidebarTrigger className="-ml-1 cursor-pointer" />{" "}
                {/* <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4 bg-[#6E6E6E]"
                /> */}
              </>
            </div>

            <div className="rounded-sm bg-[#151515] w-full lg:h-13 h-10 flex flex-1 items-center justify-center">
              <div className="flex gap-4 items-center">
                {!isUS ? (
                  <>
                    <span>
                      <img
                        src="/icons/party-popper.png"
                        alt="party popper image"
                        className="w-5 h-5"
                      />
                    </span>
                    <p className="text-sm font-semibold text-neutral-300">
                      Start a prediction, let the world decide.
                    </p>
                    <Button
                      variant="marketGradient"
                      size="sm"
                      className="text-xs tracking-wide cursor-pointer rounded-sm"
                      asChild
                      onClick={async () => {
                        if (!connected) {
                          setVisible(true);
                          return;
                        }
                        if (!isLoggedIn) {
                          try {
                            await doLogin();
                          } catch (err) {
                            console.error("Login failed:", err);
                            return;
                          }
                        }
                        window.location.href = "/create-market";
                      }}
                    >
                      <div>Create Market</div>
                    </Button>
                  </>
                ) : (
                  <p className="text-sm font-medium text-orange-300 leading-snug">
                    <span className="font-semibold">
                      You're in a Restricted Region.
                    </span>{" "}
                    Trading is not permitted to persons located in the United
                    States, China, or persons located in restricted
                    jurisdictions.{" "}
                    <Link
                      href="/terms"
                      className="underline text-orange-200 hover:text-orange-100"
                    >
                      See Terms of Use
                    </Link>{" "}
                    for more information.
                  </p>
                )}

                <button className="cursor-pointer absolute right-7 text-neutral-600 hover:text-white transition-colors">
                  <HugeiconsIcon icon={Cancel01Icon} />
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className="flex md:hidden px-4 pt-4 justify-between">
          <div>
            <p className="text-2xl font-bold">NoLimit</p>
          </div>
          <div>
            <Button variant="marketGradient" asChild>
              <Link href="/create-market">Create Market</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
