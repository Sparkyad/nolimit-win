"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* <SidebarMenuButton size="lg"> */}
        <div className="flex gap-2  items-center">
          <img src="/Logo/logo.jpeg" className="w-12 rounded-sm" />
          <p className="text-xl group-data-[collapsible=icon]:hidden">
            Arbvark
          </p>
        </div>
        {/* </SidebarMenuButton> */}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
