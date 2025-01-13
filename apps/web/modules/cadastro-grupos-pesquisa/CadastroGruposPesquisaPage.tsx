"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import useAddResearchGroup from "@/api/research-group/use-add-research-group";
import useGetAllKnowledgeAreas from "@/api/research-group/use-get-all-knowledgeAreas";
import { CreateResearchGroup } from "@/types/researchGroup";
import { useToast } from "@/hooks/use-toast";

const CadastrarGruposPesquisa = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<CreateResearchGroup>();
  const [knowledgeArea, setKnowledgeArea] = useState("");
  const { data: knowledgeAreas } = useGetAllKnowledgeAreas();
  const [areas, setAreas] = useState<{ id: string; name: string }[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setValue("knowledgeArea", knowledgeArea);
  }, [knowledgeArea, setValue]);

  useEffect(() => {
    setAreas(knowledgeAreas || []);
  }, [knowledgeAreas]);

  const { mutate, isPending } = useAddResearchGroup(
    () => {
      toast({
        title: "Sucesso",
        description: "O grupo de pesquisa foi cadastrado com sucesso.",
      });
    },
    () => {
      toast({
        variant: "destructive",
        title: "Ocorreu um erro",
        description: "Ocorreu um erro ao tentar criar novo grupo de pesquisa.",
      });
    }
  );

  const onSubmit = (data: CreateResearchGroup) => {
    const researchGroupData: CreateResearchGroup = {
      name: data.name,
      description: data.description,
      knowledgeArea: data.knowledgeArea,
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
              <BreadcrumbLink
                className="hover:text-blue-strong"
                href="/meus-grupos-pesquisa"
              >
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
            <label className="font-bold text-blue-strong mt-4">
              Área de Pesquisa*
              <Select
                onValueChange={setKnowledgeArea}
                {...register("knowledgeArea", { required: true })}
              >
                <SelectTrigger className="w-full py-6 px-4 text-base font-medium rounded-lg border mt-2 data-[placeholder]:text-muted-foreground">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem value={area.id}>{area.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.knowledgeArea && (
                <span className="text-red font-normal text-sm">
                  Área de Pesquisa é obrigatória
                </span>
              )}
            </label>
            {/*
              <div className="font-bold text-base mt-4 text-blue-strong">
                <label>Foto de perfil (TODO)</label>
                <div className="flex items-center mt-4">
                  <Button className="rounded-full py-2.5 px-8">
                    Adicionar anexo
                  </Button>
                </div>
              </div> 
                  */}
            <label className="font-bold text-blue-strong mt-4">
              Link do grupo no CNPQ
              <input
                type="url"
                placeholder="URL CNPQ"
                className="w-full py-3 px-4 text-base font-normal rounded-lg border mt-2"
                {...register("urlCNPQ", { required: false })}
              />
            </label>

            <div className="flex gap-4 justify-center mt-10">
              <Button
                type="submit"
                className="rounded-full py-2.5 px-8"
                disabled={isPending}
              >
                {isPending ? "Cadastrando..." : "Cadastrar Grupo de Pesquisa"}
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

export default CadastrarGruposPesquisa;
