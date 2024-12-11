"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CustomIcon } from "../components/icon/customIcon";
import Image from "next/image";
import MembersSection from "./components/membersSection";
import { useParams } from "next/navigation";
import useGetResearchGroup from "@/api/grupos/use-get-research-group";
import { is } from "date-fns/locale";
import { TMember } from "./types/researchgroup.type";

export default function DetalheGrupoPesquisaPage() {
  const params = useParams();
  const groupId = params.id;

  const {
    data: researchGroup,
    isError,
    error,
    isLoading,
  } = useGetResearchGroup(groupId as string);
  const handleAddProject = () => {};

  if (isLoading) {
    return <div>Carregando...</div>;
  }
  return (
    <main className="p-8 w-full flex justify-center">
      <section className="max-w-7xl w-full">
        <div className="flex  flex-col">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="hover:text-blue-strong"
                  href="/cadastro-projetos"
                >
                  Grupos de Pesquisa
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary font-bold">
                  Detalhes do Grupo de Pesquisa
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex mb-4 justify-between center">
            <h1 className="text-4xl font-bold text-blue-strong">
              {researchGroup?.name}
            </h1>

            <Button className="rounded-full" onClick={handleAddProject}>
              <CustomIcon icon={IoIosAddCircleOutline} className="!size-5" />{" "}
              Novo Projeto
            </Button>
          </div>
        </div>

        <div className="flex w-[100%] gap-5">
          <div className="flex gap-5 p-5 items-center justify-center flex-col max-w-[30%] bg-[#fff] border-[2px] rounded-md border-[#C6C2DE]">
            <img
              src="https://ufba.br/sites/portal.ufba.br/files/noticias/brasao_ufba_-_copia.jpg"
              alt="Grupo de Pesquisa"
              className="max-w-[80%]"
            />

            <h1 className="font-size-lg text-2xl">{researchGroup?.name}</h1>

            <p>{researchGroup?.description}</p>
          </div>

          <div className="flex flex-col gap-5 w-[100%]">
            <div className="flex gap-5">
              <Button className="rounded-full">Lista de Membros</Button>

              <Button className="rounded-full">Lista de Projetos</Button>
            </div>
            {researchGroup ? (
              <MembersSection members={researchGroup?.members} />
            ) : (
              <div>Carregando...</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}