"use client";

import useAddProject from "@/api/projects/use-add-project";
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
import { CreateProject } from "@/types/project";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { ProjectFormData } from "./types/project-form-data";
import Keywords from "@/components/keywords";
import { useState } from "react";
import { isBefore } from "date-fns";

const CadastrarProjeto = () => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProjectFormData>();
  const { toast } = useToast();
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { mutate } = useAddProject(
    () => {
      toast({
        variant: "success",
        title: "Sucesso",
        description: "O projeto foi cadastrado com sucesso.",
      });
      router.back();
    },
    () => {
      toast({
        variant: "destructive",
        title: "Ocorreu um error",
        description: "Ocorreu um erro ao tentar criar novo projeto.",
      });
    }
  );

  const [keywordRequired, setKeywordRequired] = useState<boolean>(false);
  const onSubmit = (data: ProjectFormData) => {
    if (!selectedKeywords.length) {
      setKeywordRequired(true);
      return;
    }

    const projectData: CreateProject = {
      researchGroupId: params.id,
      name: data.name,
      description: data.description,
      link: data.link,
      keywords: selectedKeywords,
    };

    mutate(projectData);
  };

  const handleRedirect = () => {
    router.back();
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
                Cadastrar Projetos
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex mb-4">
          <h1 className="text-4xl font-bold text-blue-strong">
            Cadastrar Projeto
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
                placeholder="Título do projeto"
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
              Link
              <input
                type="url"
                placeholder="Informe link do projeto"
                className="w-full py-3 px-4 text-base font-normal rounded-lg border mt-2"
                {...register("link", { required: false })}
              />
            </label>

            <div className="flex flex-row gap-4 justify-center mt-10">
              <Button type="submit" className="rounded-full py-2.5 px-8">
                Cadastrar projeto
              </Button>
              <Button
                variant={"outline"}
                className="rounded-full py-2.5 px-8"
                type="reset"
                onClick={handleRedirect}
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

export default CadastrarProjeto;
