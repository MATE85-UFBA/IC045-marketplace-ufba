"use client";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { FaTrash } from "react-icons/fa";
import { IoMdCreate } from "react-icons/io";
import { Demanda } from "../../interfaces/demanda";
import { CustomIcon } from "@/modules/components/icon/customIcon";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";

interface Params {
  data: Demanda[];
}
const MinhasDemandasTable = ({ data }: Params) => {
  const handleClick = () => {
    console.log("teste");
  };

  const columns: ColumnDef<Demanda>[] = [
    {
      accessorKey: "title",
      header: "Título",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "createdAt",
      header: "Criado Em",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="bg-white rounded-2xl px-6 py-8">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="text-blue-strong font-semibold text-2xl"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
              <TableHead className="text-blue-strong font-semibold text-2xl">
                Ações
              </TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell className="text-blue-light py-6" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex gap-8">
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={handleClick}
                      title="Editar"
                    >
                      <CustomIcon icon={IoMdCreate} className="!size-5" />
                    </Button>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={handleClick}
                      title="Apagar"
                    >
                      <CustomIcon icon={FaTrash} className="!size-5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <GoArrowLeft />
        </Button>
        <div>{table.getPageCount()}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <GoArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default MinhasDemandasTable;