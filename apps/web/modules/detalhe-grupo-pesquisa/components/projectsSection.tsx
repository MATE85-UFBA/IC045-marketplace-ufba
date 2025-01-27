import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";

import React from "react";
import { TProject } from "../types/researchgroup.type";

type TProps = {
  projects: TProject[];
};
export default function ProjectsSection(props: TProps) {
  return (
    <div className="bg-white rounded-2xl px-3 py-4 w-[100%]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
              Título
            </TableHead>
            {/*
            <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
              Status
            </TableHead>
            */}

            <TableHead className="text-blue-strong font-semibold text-lg sm:text-2xl">
              Palavras-Chaves
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.projects.map((project) => {
            return (
              <TableRow>
                <TableCell className="text-blue-light py-6">
                  {project.name}
                </TableCell>
                {/*
                <TableCell className="text-blue-light py-6">
                  {project.finished_at ?? "Em andamento"}
                </TableCell>
                */}

                <TableCell className="text-blue-light py-6">
                  {project.keywords.map((keyword) => {
                    return (
                      <span className="mr-2 text-blue-light bg-primary text-primary-foreground p-2 rounded-2xl">
                        {keyword.name ? keyword.name : "N/A"}
                      </span>
                    );
                  })}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
