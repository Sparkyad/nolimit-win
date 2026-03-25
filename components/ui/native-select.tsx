import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <div
      className="relative w-fit"
      data-slot="native-select-wrapper"
    >
      <select
        data-slot="native-select"
        className={cn(
          "appearance-none outline-none",
          "bg-white text-black dark:bg-white dark:text-black",
          "px-4 py-1 lg:py-2 pr-10 h-10 rounded-md",
          "text-xs font-medium cursor-pointer",
          "transition-all duration-200",
          "shadow-md hover:shadow-lg",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-black/70"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  )
}

function NativeSelectOption(props: React.ComponentProps<"option">) {
  return (
    <option
      className="bg-neutral-900 text-white outline-none"
      data-slot="native-select-option"
      {...props}
    />
  )
}

function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn(className)}
      {...props}
    />
  )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
