import {
  Analytics01Icon,
  Award01Icon,
  Home01Icon,
  Menu01Icon,
  PlusSignIcon,
  UserStoryIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const AdminMobileNavbar = () => {
  return (
    <div className="block md:hidden w-full h-24 bg-linear-to-t from-neutral-900 to-neutral-800 fixed bottom-0 rounded-t-3xl border-t border-neutral-600 shadow-lg">
      <div className="p-4 h-full flex justify-center items-center text-xs">
        <Link
          href="/admin-create"
          className="flex-1 flex justify-center flex-col items-center gap-2"
        >
          <HugeiconsIcon icon={PlusSignIcon} />
          <span>Create</span>
        </Link>

        <Link
          href="/admin-dash"
          className="flex-1 flex justify-center flex-col items-center gap-2"
        >
          <HugeiconsIcon icon={Home01Icon} />
          <span>Home</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex-1 flex justify-center flex-col items-center gap-2">
              <HugeiconsIcon icon={Menu01Icon} />
              <span>Menu</span>
            </div>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="bg-neutral-900 border-transparent text-white pb-10"
          >
            <SheetHeader>
              <SheetTitle className="text-white text-xl flex gap-4 items-center">
                <img
                  src="/Logo/logo.jpeg"
                  alt="logo"
                  className="w-8 aspect-square object-cover rounded-md"
                />
                Arbvark
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 px-5">
              <div className="pb-3">
                <span className="text-2xl font-semibold">Hello, Ariana!</span>
              </div>
              {/* <SheetTrigger asChild>
                <Link
                  href="/leaderboard"
                  className="text-lg font-semibold flex gap-4 items-center"
                >
                  <HugeiconsIcon
                    icon={Award01Icon}
                    className="text-yellow-500"
                  />
                  Leaderboard
                </Link>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Link
                  href="/user-dashboard"
                  className="text-lg font-semibold flex gap-4 items-center"
                >
                  <HugeiconsIcon
                    icon={Analytics01Icon}
                    className="text-pink-400"
                  />
                  Analytics
                </Link>
              </SheetTrigger>
              <SheetTrigger asChild>
                <Link
                  href="/profile"
                  className="text-lg font-semibold flex gap-4 items-center"
                >
                  <HugeiconsIcon
                    icon={UserStoryIcon}
                    className="text-blue-400"
                  />
                  Profile
                </Link>
              </SheetTrigger> */}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
