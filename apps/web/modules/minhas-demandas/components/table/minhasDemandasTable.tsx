"use client";
import { Button } from "@/components/ui/button";
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

interface Params {
  list: Demanda[];
}
const MinhasDemandasTable = ({ list }: Params) => {
  const handleClick = () => {
    console.log("teste");
  };
  return (
    <div className="bg-white rounded-2xl px-6 py-8">
      <Table>
        <TableHeader>
          <TableRow className="">
            <TableHead className="text-blue-strong font-semibold text-2xl">
              Título
            </TableHead>
            <TableHead className="text-blue-strong font-semibold text-2xl ">
              Status
            </TableHead>
            <TableHead className="text-blue-strong font-semibold text-2xl ">
              Criado Em
            </TableHead>
            <TableHead className="text-blue-strong font-semibold text-2xl ">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list ? (
            list.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-blue-light py-6">
                  {item.title}
                </TableCell>
                <TableCell className="text-blue-light py-6">
                  {item.status}
                </TableCell>
                <TableCell className="text-blue-light py-6">
                  {item.createdAt}
                </TableCell>
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
            <></>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MinhasDemandasTable;
