import { Table } from "@tanstack/react-table";

import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

import { ELLIPSIS, useReactTablePaginationRange } from "./use-pagination";
import { UserType } from "../../types/user";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  table: Table<UserType>;
}

function Pagination({ table }: PaginationProps) {
  const paginationRange = useReactTablePaginationRange(table);

  return (
    <div className="flex items-center justify-center mt-4 gap-2">
      <Button
        variant="outline"
        className="bg-white border-none shadow-xl rounded-lg h-8 w-8"
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <FiChevronsLeft />
      </Button>
      <Button
        variant="outline"
        className="bg-white border-none shadow-xl rounded-lg h-8 w-8"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <FiChevronLeft />
      </Button>
      {paginationRange.map((page, index) => {
        const isOnCurrentPage =
          table.getState().pagination.pageIndex + 1 === page;
        return (
          <div key={index}>
            {page === ELLIPSIS ? (
              <span>…</span>
            ) : (
              <Button
                variant={isOnCurrentPage ? "default" : "outline"}
                className={`border-none shadow-xl rounded-lg h-8 w-8 ${
                  !isOnCurrentPage && "bg-white"
                }`}
                onClick={() => table.setPageIndex(page - 1)}
              >
                {page}
              </Button>
            )}
          </div>
        );
      })}
      <Button
        variant="outline"
        className="bg-white border-none shadow-xl rounded-lg h-8 w-8"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <FiChevronRight />
      </Button>
      <Button
        variant="outline"
        className="bg-white border-none shadow-xl rounded-lg h-8 w-8"
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        <FiChevronsRight />
      </Button>
    </div>
  );
}

export { Pagination };
