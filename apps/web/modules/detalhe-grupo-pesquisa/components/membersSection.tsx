import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

import React from "react";
import { TMember } from "../types/researchgroup.type";

type TProps = {
  members: TMember[];
};
export default function MembersSection(props: TProps) {
  return (
    <div className="bg-white rounded-2xl px-3 py-4 w-[100%]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
              Nome
            </TableHead>

            <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
              Email
            </TableHead>

            <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
              Papel
            </TableHead>

            <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.members.map((member) => {
            return (
              <TableRow>
                <TableCell className="text-blue-light py-6">
                  {member.userId}
                </TableCell>
                <TableCell className="text-blue-light py-6">
                  {member.updatedAt}
                </TableCell>
                <TableCell className="text-blue-light py-6">
                  {member.updatedAt}
                </TableCell>
                <TableCell className="text-blue-light py-6">
                  {member.updatedAt}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
