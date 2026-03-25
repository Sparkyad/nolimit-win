import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export const PageFrame = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-auto p-3 md:p-6">
      <div className="border rounded-lg h-full border-neutral-800 md:py-4">
        <div className="px-3">
          <div className="pb-2 hidden md:block">
            <SidebarTrigger />
          </div>
        </div>
        <Separator className="bg-neutral-800 hidden md:block" />
        <div>{children}</div>
      </div>
    </div>
  );
};
