"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

import { UserType } from "../../types/user";
import { columns } from "./columns";
import { Pagination } from "./pagination";

const data: UserType[] = [
  {
    id: "1",
    name: "Paulo",
    role: "ADMIN",
    utype: "RESEARCHER",
    isActive: true,
  },
  {
    id: "2",
    name: "Joel",
    role: "USER",
    utype: "RESEARCHER",
    isActive: false,
  },
  {
    id: "3",
    name: "Nvidia",
    role: "USER",
    utype: "COMPANY",
    isActive: false,
  },
  {
    id: "4",
    name: "Felipe",
    role: "USER",
    utype: "RESEARCHER",
    isActive: true,
  },
  {
    id: "5",
    name: "Empresa 1",
    role: "ADMIN",
    utype: "COMPANY",
    isActive: false,
  },
  {
    id: "6",
    name: "Empresa 2",
    role: "ADMIN",
    utype: "COMPANY",
    isActive: true,
  },
  {
    id: "7",
    name: "Empresa 3",
    role: "ADMIN",
    utype: "COMPANY",
    isActive: true,
  },
  {
    id: "8",
    name: "Empresa 4",
    role: "ADMIN",
    utype: "COMPANY",
    isActive: true,
  },
  {
    id: "9",
    name: "Matheus",
    role: "USER",
    utype: "RESEARCHER",
    isActive: false,
  },
  {
    id: "10",
    name: "Pedro",
    role: "ADMIN",
    utype: "RESEARCHER",
    isActive: false,
  },
  {
    id: "11",
    name: "Empresa 5",
    role: "ADMIN",
    utype: "COMPANY",
    isActive: false,
  },
];

function UsersTable() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  return (
    <div className="w-full">
      <Input
        placeholder="Buscar usuário"
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className="bg-white border-border mb-4 p-4"
      />
      <div className="rounded-2xl px-6 py-8 bg-white shadow-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-white">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum usuário cadastrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination table={table} />
    </div>
  );
}

export { UsersTable };
