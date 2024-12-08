import { ColumnDef } from "@tanstack/react-table";
import { UserType } from "../../types/user";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Edit } from "lucide-react";

const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nome
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Papel
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const label =
        row.getValue("role") === "ADMIN" ? "Administrador" : "Usuário";
      return <div className="capitalize">{label}</div>;
    },
  },
  {
    accessorKey: "utype",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tipo
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const utype = row.getValue("utype");
      const label =
        utype === "RESEARCHER"
          ? "Pesquisador"
          : utype === "COMPANY"
          ? "Empresa"
          : "Nenhum";

      return <div className="capitalize">{label}</div>;
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const label = row.getValue("isActive") ? "Ativo" : "Inativo";

      return <div className="capitalize">{label}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-blue-light">Ações</div>,
    cell: () => {
      return (
        <Button>
          <Edit />
        </Button>
      );
    },
  },
];

export { columns };
