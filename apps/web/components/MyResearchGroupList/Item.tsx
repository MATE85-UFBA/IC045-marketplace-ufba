import Link from "next/link";
import { TbUserCircle } from "react-icons/tb";
import { ResearchGroup } from "./type";
import { Button } from "../ui/button";

interface ItemProp {
  idPesquisador: string;
  researchgroup: ResearchGroup;
}

function Item({ idPesquisador, researchgroup }: ItemProp) {
  return (
    <li className="px-4 py-5 bg-white border rounded-2xl flex flex-col gap-3">
      <div className="flex gap-3">
        {researchgroup.image ? (
          <img
            src=""
            alt="Logo do Grupo de Pesquisa"
            className="row-span-2 col-start-1 row-start-1"
          />
        ) : (
          <TbUserCircle className="text-primary font-normal size-16 row-span-2 col-start-1" />
        )}
        <div className="flex flex-col gap-2">
          <h2 className="self-end font-semibold text-lg leading-none gap-3">
            {researchgroup.name}
          </h2>
          <p className="px-3 py-2 justify-self-start bg-border rounded-full text-xs w-max">
            {idPesquisador === researchgroup.leader.userId ? "Líder" : "Membro"}
          </p>
        </div>
      </div>
      <Button
        asChild
        variant={"outline"}
        className="px-9 py-2.5 rounded-full mt-3 xs:mt-0 w-max"
      >
        <Link href={`/detalhe-grupo-pesquisa/${researchgroup.id}`}>
          ver mais
        </Link>
      </Button>
    </li>
  );
}

export { Item };
