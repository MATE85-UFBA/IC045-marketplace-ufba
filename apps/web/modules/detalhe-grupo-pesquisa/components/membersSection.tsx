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
import { translateResearchType } from "@/modules/shared/utils/translateReasearchType.util";


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

          </TableRow>
        </TableHeader>
        <TableBody>
          {props.members.map((member) => {
            return (
              <TableRow>
                <TableCell className="text-blue-light py-6">
                  {member.user.name}
                </TableCell>
                <TableCell className="text-blue-light py-6">
                  {member.user.email}
                </TableCell>
                <TableCell className="text-blue-light py-6">
                  {translateResearchType(member.researcherType)}

                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
