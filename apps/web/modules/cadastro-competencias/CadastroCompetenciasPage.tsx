"use client";

import useAddCompetence from "@/api/competences/use-add-competence";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import { CreateCompetence } from "@/types/competence";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { CompetenceFormData } from "./types/competence-form-data";
import Keywords from "@/components/keywords";
import { useState } from "react";
import { isBefore } from "date-fns";

const CadastrarCompetencia = () => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CompetenceFormData>();
  const { toast } = useToast();
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { mutate } = useAddCompetence(
    () => {
      toast({
        variant: "success",
        title: "Sucesso",
        description: "A competência foi cadastrado com sucesso.",
      });
      router.back();
    },
    () => {
      toast({
        variant: "destructive",
        title: "Ocorreu um error",
        description: "Ocorreu um erro ao tentar criar nova competência.",
      });
    }
  );

  const [keywordRequired, setKeywordRequired] = useState<boolean>(false);
  const onSubmit = (data: CompetenceFormData) => {
    if (!selectedKeywords.length) {
      setKeywordRequired(true);
      return;
    }

    const competenceData: CreateCompetence = {
      researchGroupId: params.id,
      name: data.name,
      description: data.description,
      links: data.links
        ? Array.isArray(data.links)
          ? data.links
          : [data.links]
        : [],
      keywords: selectedKeywords,
    };

    mutate(competenceData);
  };

  return (
    <main className="p-8 w-full flex flex-1 justify-center">
      <section className="max-w-7xl w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="hover:text-blue-strong"
                href={`/detalhe-grupo-pesquisa/${params.id}`}
              >
                Detalhes do Grupo de Pesquisa
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary font-bold">
                Cadastrar Competências
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex mb-4">
          <h1 className="text-4xl font-bold text-blue-strong">
            Cadastrar Competência
          </h1>
        </div>
        <div className="p-4 bg-white shadow rounded-xl mt-4 h-[700] max-w-[1350]">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="font-bold text-blue-strong mt-4">
              Título*
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Título da competência"
                className="w-full py-3 px-4 text-base font-medium rounded-lg border mt-2"
              />
              {errors.name && (
                <span className="text-red font-normal text-sm">
                  Titulo é obrigatório
                </span>
              )}
            </label>

            <label className="font-bold text-blue-strong mt-4">
              Descrição*
              <textarea
                {...register("description", { required: true })}
                placeholder="Digite o texto..."
                rows={4}
                className="w-full py-3 px-4 text-base font-normal border rounded-lg mt-2"
              />
            </label>

            {errors.description && <span>Este Campo é obrigatório</span>}

            <Keywords
              onChange={setSelectedKeywords}
              defaultValue={selectedKeywords}
            />

            {keywordRequired && <span>Este Campo é obrigatório</span>}

            <label className="font-bold text-blue-strong mt-4">
              Links Úteis
              <input
                type="url"
                placeholder="Informe links úteis"
                className="w-full py-3 px-4 text-base font-normal rounded-lg border mt-2"
                {...register("links", { required: false })}
              />
            </label>

            <div className="flex flex-row gap-4 justify-center mt-10">
              <Button type="submit" className="rounded-full py-2.5 px-8">
                Cadastrar competência
              </Button>
              <Button
                variant={"outline"}
                className="rounded-full py-2.5 px-8"
                type="reset"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CadastrarCompetencia;
