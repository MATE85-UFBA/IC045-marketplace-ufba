"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React, { useState } from "react";
import { MultiSelect } from "@/modules/cadastro-grupos-pesquisa/components/multi-select";
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import useAddResearchGroup from '@/api/use-add-research-group';
import { CreateResearchGroup } from '@/types/researchGroup';
import { useToast } from '@/hooks/use-toast';

const knowledgeAreas = [
  { value: "artes", label: "Artes" },
  { value: "ciencias_biologicas", label: "Ciências Biológicas e Profissões da Saúde" },
  { value: "ciencias_fisicas", label: "Ciências Físicas, Matemática e Tecnologia" },
  { value: "filosofia", label: "Filosofia e Ciências Humanas" },
  { value: "letras", label: "Letras" },
];


const CadastrarGruposPesquisa = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<CreateResearchGroup>();
  const [selectedKnowledgeAreas, setSelectedKnowledgeAreas] = useState<string[]>([]);
  const { toast } = useToast()

  const { mutate, isPending } = useAddResearchGroup(
    () => {
      toast({
        title: "Sucesso",
        description: "O grupo de pesquisa foi cadastrado com sucesso."
      });
    },
    () => {
      toast({
        variant: 'destructive',
        title: "Ocorreu um erro",
        description: "Ocorreu um erro ao tentar criar novo grupo de pesquisa."
      });
    }
  );

  const onSubmit = (data: CreateResearchGroup) => {

    const researchGroupData: CreateResearchGroup = {
      name: data.name,
      description: data.description,
      knowledgeAreas: data.knowledgeAreas, 
      urlCNPQ: data.urlCNPQ,
    };

    mutate(researchGroupData);
  };

  return (
      <main className="p-8 w-full flex justify-center">
        <section className="max-w-7xl w-full">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="hover:text-blue-strong" href="/meus-grupos-pesquisa">
                  Meus Grupos de Pesquisa
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary font-bold">
                  Cadastrar Grupo de Pesquisa
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex mb-4">
            <h1 className="text-4xl font-bold text-blue-strong">
              Cadastrar Grupo de Pesquisa
            </h1>
          </div>
          <div className="p-4 bg-white shadow rounded-xl mt-4 h-[700] max-w-[1350]">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="font-bold text-blue-strong mt-4">
                Nome*
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Nome do Grupo de Pesquisa"
                  className="w-full py-3 px-4 text-base font-medium rounded-lg border mt-2"
                />
                {errors.name && (
                  <span className="text-red font-normal text-sm">
                    Nome é obrigatório
                  </span>
                )}
              </label>

              <label className="font-bold text-blue-strong mt-4">
                Área de Pesquisa
                <MultiSelect
                  className="w-full py-3 px-4 text-base font-medium rounded-lg border mt-2"
                  options={knowledgeAreas}
                  onValueChange={setSelectedKnowledgeAreas}
                  defaultValue={selectedKnowledgeAreas}
                  placeholder="Selecione Áreas de Pesquisa"
                  variant="inverted"
                  maxCount={5}
                />
              </label>

              <div className="font-bold text-base mt-4 text-blue-strong">
                <label>Foto de perfil (TODO)</label>
                <div className="flex items-center mt-4">
                  <Button className="rounded-full py-2.5 px-8">
                    Adicionar anexo
                  </Button>
                </div>
              </div> 

              <label className="font-bold text-blue-strong mt-4">
                Link do grupo no CNPQ
                <input
                  type="url"
                  placeholder="URL CNPQ"
                  className="w-full py-3 px-4 text-base font-normal rounded-lg border mt-2"
                  {...register("urlCNPQ", { required: false })}
                />
              </label>

              <label className="font-bold text-blue-strong mt-4">
                Descrição*
                <textarea
                  {...register("description", { required: true })}
                  placeholder="Digite o texto..."
                  rows={4}
                  className="w-full py-3 px-4 text-base font-normal border rounded-lg mt-2"
                />
                {errors.description && (
                  <span className="text-red font-normal text-sm">
                    Descrição é obrigatória
                  </span>
                )}
              </label>

              <div className="flex gap-4 justify-center mt-10">
                <Button
                  variant={"outline"}
                  className="rounded-full py-2.5 px-8"
                  type="reset"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="rounded-full py-2.5 px-8" disabled={isPending}>
                  {isPending ? "Cadastrando..." : "Cadastrar Grupo de Pesquisa"}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
  );
};

export default CadastrarGruposPesquisa;
