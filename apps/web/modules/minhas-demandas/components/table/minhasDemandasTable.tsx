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

interface Params {
  list: Demanda[];
}
const MinhasDemandasTable = ({ list }: Params) => {
  return (
    <Table className="bg-white rounded-2xl">
      <TableHeader>
        <TableRow className="py-8 px-6">
          <TableHead className="text-blue-strong font-semibold text-2xl py-8 px-6">
            Título
          </TableHead>
          <TableHead className="text-blue-strong font-semibold text-2xl py-8 px-6">
            Status
          </TableHead>
          <TableHead className="text-blue-strong font-semibold text-2xl py-8 px-6">
            Criado Em
          </TableHead>
          <TableHead className="text-blue-strong font-semibold text-2xl py-8 px-6">
            Ações
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list ? (
          list.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="text-blue-light py-8 px-6">
                {item.title}
              </TableCell>
              <TableCell className="text-blue-light py-8 px-6">
                {item.status}
              </TableCell>
              <TableCell className="text-blue-light py-8 px-6">
                {item.createdAt}
              </TableCell>
              <TableCell>
                <div className="flex gap-8 text-blue-light">
                  <Button variant={"ghost"} size={"icon"}>
                    <IoMdCreate />
                  </Button>
                  <Button variant={"ghost"} size={"icon"}>
                    <FaTrash />
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
  );
};

export default MinhasDemandasTable;
