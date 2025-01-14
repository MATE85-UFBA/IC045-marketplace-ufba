"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { PiArrowBendDoubleUpLeft } from "react-icons/pi";
import { CustomIcon } from "../components/icon/customIcon";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useGetOneDemand from "@/api/demandas/use-get-one-demand";
import { useEffect, useState } from "react";
import { Demanda } from "../minhas-demandas/interfaces/demanda";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  query: any;
}
const ContactCompany = ({ query }: Props) => {
  const [demanda, setDemanda] = useState<Demanda>();
  const getDemand = useGetOneDemand(
    (data) => {
      setDemanda(data);
    },
    () => {}
  );

  useEffect(() => {
    const idDemanda = query.get("idDemanda");

    if (idDemanda) getDemand.mutate(idDemanda);
  }, [query]);

  console.log(demanda);

  return (
    <main className="p-8 w-full flex flex-col flex-grow items-center">
      <section className="max-w-7xl itens-center w-full flex flex-col">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="hover:text-blue-strong"
                href="/encontrar-demandas"
              >
                Encontrar demandas
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary font-bold">
                Contactar Empresa
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-col sm:flex-row w-full gap-4 justify-between mb-4">
          <h2 className="text-3xl sm:text-4xl font-semibold text-blue-strong">
            Contactar Empresa
          </h2>
          <Button asChild className="rounded-full w-fit">
            <Link href={"/encontrar-demandas"}>
              <CustomIcon icon={PiArrowBendDoubleUpLeft} className="!size-5" />
              Voltar ao menu de demandas
            </Link>
          </Button>
        </div>
      </section>
      <section className="flex flex-col lg:flex-row gap-6 max-w-7xl">
        <aside className=" lg:w-1/4 bg-white p-5 flex flex-col rounded-xl border gap-4 h-hull">
          <h3 className="text-2xl sm:text-3xl font-semibold text-blue-strong self-center">
            {demanda ? demanda.name : ""}
          </h3>
          <span className="text-sm text-blue-light mt-2">
            Publicado{" "}
            {demanda
              ? formatDistanceToNow(demanda.createdAt, {
                  locale: ptBR,
                  addSuffix: true,
                })
              : ""}
          </span>
          <p className="text-blue-strong text-justify leading-5">
            {demanda ? demanda.description : ""}
          </p>
          <div className="flex flex-wrap gap-2">
            {demanda
              ? demanda.competences?.map((competence) => (
                  <div
                    key={competence.id}
                    className="bg-secondary rounded-full py-2 px-3 text-xs text-blue-strong w-28 text-center"
                  >
                    {competence.name}
                  </div>
                ))
              : ""}
            {demanda
              ? demanda.keywords?.map((keyoword) => (
                  <div
                    key={keyoword.id}
                    className="bg-secondary rounded-full py-2 px-3 text-xs text-blue-strong w-28 text-center"
                  >
                    {keyoword.name}
                  </div>
                ))
              : ""}
          </div>
          <span className="font-semibold">
            Empresa {demanda?.company?.user.name}
          </span>
        </aside>
        <section className="lg:w-3/4 bg-white shadow rounded-xl p-5">
          <section>
            <h2 className="text-2xl sm:text-3xl font-semibold text-blue-strong">
              Entre em contato
            </h2>
          </section>
          <hr className="my-4" />
          <section className="flex flex-col gap-4">
            <p className="text-xl">
              <span className="font-semibold">Competência: </span> Nome da
              competência
            </p>
            <p className="text-xl">
              <span className="font-semibold">Empresa: </span>{" "}
              {demanda?.company?.user.name}
            </p>
          </section>
          <hr className="my-4" />
          <section className="flex flex-col gap-3">
            <h4 className="font-semibold text-xl">Grupo de Pesquisa</h4>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o Grupo de Pesquisa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grupo1">Grupo1</SelectItem>
                <SelectItem value="grupo2">Grupo2</SelectItem>
                <SelectItem value="grupo3">Grupo3</SelectItem>
              </SelectContent>
            </Select>
            <h4 className="font-semibold text-xl">Mensagem</h4>
            <Textarea placeholder="Descreva para a empresa a sua proposta para a competência..." />
            <Button
              type="submit"
              className="rounded-full w-fit self-end py-2 px-8"
            >
              Enviar proposta
            </Button>
          </section>
        </section>
      </section>
    </main>
  );
};

export default ContactCompany;
