"use client";

import { type ReactNode, useCallback, useTransition } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface PaginationWithLinksProps {
  pageSizeSelectOptions?: {
    pageSizeSearchParam?: string;
    pageSizeOptions: number[];
  };
  totalCount: number;
  pageSize: number;
  page: number; // ✅ 0-based
  pageSearchParam?: string;
  navigationMode?: "link" | "router";
}

export function PaginationWithLinks({
  pageSizeSelectOptions,
  pageSize,
  totalCount,
  page,
  pageSearchParam,
  navigationMode = "link",
}: PaginationWithLinksProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const totalPageCount = Math.max(1, Math.ceil(totalCount / pageSize));
  const lastPage = totalPageCount - 1; // ✅ 0-based

  const buildLink = useCallback(
    (newPage: number) => {
      const key = pageSearchParam || "page";
      const params = new URLSearchParams(searchParams || undefined);
      params.set(key, String(newPage));
      return `${pathname}?${params.toString()}`;
    },
    [pageSearchParam, searchParams, pathname]
  );

  const navigateToPage = useCallback(
    (newPage: number) => {
      if (newPage < 0 || newPage > lastPage) return;
      const url = buildLink(newPage);

      if (navigationMode === "router") {
        startTransition(() => router.push(url));
      } else {
        router.push(url);
      }
    },
    [navigationMode, buildLink, router, lastPage]
  );

  const navToPageSize = useCallback(
    (newPageSize: number) => {
      const key = pageSizeSelectOptions?.pageSizeSearchParam || "pageSize";
      const params = new URLSearchParams(searchParams || undefined);
      params.set(key, String(newPageSize));
      params.set(pageSearchParam || "page", "0"); // reset to first page
      router.push(`${pathname}?${params.toString()}`);
    },
    [pageSizeSelectOptions, pageSearchParam, searchParams, pathname, router]
  );

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisible = 5;

    const start = Math.max(0, page - 2);
    const end = Math.min(lastPage, start + maxVisible - 1);

    if (start > 0) {
      items.push(createPageItem(0));
      if (start > 1) items.push(<PaginationEllipsis key="start-ellipsis" />);
    }

    for (let i = start; i <= end; i++) {
      items.push(createPageItem(i));
    }

    if (end < lastPage) {
      if (end < lastPage - 1)
        items.push(<PaginationEllipsis key="end-ellipsis" />);
      items.push(createPageItem(lastPage));
    }

    return items;
  };

  const createPageItem = (pageNum: number) => (
    <PaginationItem key={pageNum}>
      <PaginationLink
        onClick={() => navigateToPage(pageNum)}
        isActive={page === pageNum}
        className={cn(
          "cursor-pointer text-white bg-linear-to-t from-neutral-950 to-neutral-900 border-none hover:text-neutral-200",
          isPending && "pointer-events-none opacity-50"
        )}
      >
        {pageNum + 1}
      </PaginationLink>
    </PaginationItem>
  );

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
      {pageSizeSelectOptions && (
        <SelectRowsPerPage
          options={pageSizeSelectOptions.pageSizeOptions}
          setPageSize={navToPageSize}
          pageSize={pageSize}
        />
      )}

      <Pagination className="w-full overflow-hidden">
        <PaginationContent className="flex-wrap justify-center gap-1">
          {isPending && (
            <PaginationItem>
              <Loader2 className="h-4 w-4 animate-spin" />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationPrevious
              onClick={() => navigateToPage(page - 1)}
              aria-disabled={page === 0}
              className={cn(
                page === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"
              )}
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              onClick={() => navigateToPage(page + 1)}
              aria-disabled={page === lastPage}
              className={cn(
                page === lastPage
                  ? "pointer-events-none opacity-50 "
                  : "cursor-pointer"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

function SelectRowsPerPage({
  options,
  setPageSize,
  pageSize,
}: {
  options: number[];
  setPageSize: (newSize: number) => void;
  pageSize: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm">Rows per page</span>

      <Select
        value={String(pageSize)}
        onValueChange={(value) => setPageSize(Number(value))}
      >
        <SelectTrigger>
          <SelectValue>{pageSize}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={String(opt)}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
