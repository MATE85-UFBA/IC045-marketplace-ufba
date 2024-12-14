"use client";

import useAddProject from "@/api/use-add-project";
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
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";


const CadastrarProjeto = () => {
  // Tipagem simulada para evitar erro

  const {
    handleSubmit,
    register,
    formState: { errors },

  } = useForm<CreateProject>();
  const { toast } = useToast();
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { mutate, isPending } = useAddProject(
    () => {
      toast({
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

  const onSubmit = (data: CreateProject) => {
    const projectData: CreateProject = {
      researchGroupId: params.id,
      name: data.name,
      description: data.description,
      started_at: new Date(data.started_at),
      finished_at: data.finished_at ? new Date(data.finished_at) : undefined,
      keywords: Array.isArray(data.keywords)
        ? data.keywords.map((keyword) => keyword.split(",")[0])
        : data.keywords,
    };
    console.log(data);
    mutate(projectData);
  };

  return (
    <main className="p-8 w-full flex justify-center">
      <section className="max-w-7xl w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="hover:text-blue-strong"
                href="/cadastro-projetos"
              >
                Meus Projetos
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

            <label className="font-bold text-blue-strong mt-4">
              Palavras-Chave (Separadas por vírgula)
              <input
                type="text"
                placeholder="Ex: Palavra-Chave 1, Palavra-Chave 2"
                className="w-full py-3 px-4 text-base font-normal rounded-lg border mt-2"
                {...register("keywords", { required: true })}
              />
            </label>


            {errors.keywords && <span>Este Campo é obrigatório</span>}

            <div className="grid grid-cols-2 gap-4">
              <label className="flex gap-2 font-bold text-blue-strong mt-4">
                Data de Início*
                <CalendarIcon className="w-6 h-6" />
                <input
                  type="date"
                  {...register("started_at", { required: true })}
                  className="w-full py-3 px-4 text-base font-normal rounded-lg border"
                />
              </label>

              {errors.started_at && <span>Este Campo é obrigatório</span>}

              <label className="flex gap-2 font-bold text-blue-strong mt-4">
                Data de Fim
                <CalendarIcon className="w-6 h-6" />
                <input
                  type="date"
                  {...register("finished_at", { required: false })}
                  className="w-full py-3 px-4 text-base font-normal rounded-lg border"
                />
              </label>
            </div>

            <div className="flex flex-row-reverse gap-4 justify-center mt-10">
              <Button type="submit" className="rounded-full py-2.5 px-8">
                Cadastrar projeto
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

export default CadastrarProjeto;
