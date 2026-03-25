import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Home01FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export const AdminPageFrame = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("h-auto p-3 md:p-6", className)}>
      <div className="border rounded-lg h-full border-neutral-800 md:py-4">
        {/* <div className="px-3">
          <div className="pb-2 hidden md:flex gap-5">
            <SidebarTrigger />
          </div>
        </div>
        <Separator className="bg-neutral-800 hidden md:block" /> */}
        <div>{children}</div>
      </div>
    </div>
  );
};
