import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

import React from "react";
import { TCompetence } from "../types/researchgroup.type";

type TProps = {
  competences: TCompetence[];
};
export default function CompetencesSection(props: TProps) {
  return (
    <div className="bg-white rounded-2xl px-3 py-4 w-[100%]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
              Nome
            </TableHead>
            {/*
            <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
              Status
            </TableHead>
            */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.competences.map((competence) => {
            return (
              <TableRow>
                <TableCell className="text-blue-light py-6">
                  {competence.name}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
