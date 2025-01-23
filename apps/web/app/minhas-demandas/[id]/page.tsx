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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CreateDemand } from "@/types/demand";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { FiInfo } from "react-icons/fi";
import { useEffect, useState } from "react";
import Keywords from "@/components/keywords";
import { useParams } from "next/navigation";
import { Demanda } from "@/modules/minhas-demandas/interfaces/demanda";
import useEditDemand from "@/api/demandas/use-edit-demand";
import useGetOnePrivateDemand from "@/api/demandas/use-get-one-private-demand";

const EditarDemanda = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [demanda, setDemanda] = useState<Demanda>();

  const getDemand = useGetOnePrivateDemand(
    (data) => {
      setDemanda(data);
    },
    () => {}
  );

  useEffect(() => {
    const idDemanda = params.id;

    if (idDemanda) getDemand.mutate(idDemanda);
  }, [params.id]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<CreateDemand>();
  const { toast } = useToast();

  useEffect(() => {
    if (demanda) {
      setSelectedKeywords(demanda.keywords.map((keyword) => keyword.id));
      setValue("name", demanda.name);
      setValue("description", demanda.description);
      setValue("links", demanda.links);
    }
  }, [demanda]);

  const { mutate, isPending } = useEditDemand(
    () => {
      toast({
        variant: "success",
        title: "Sucesso",
        description: "A demanda foi editada com sucesso.",
      });

      router.push("/minhas-demandas");
    },
    () => {
      toast({
        variant: "destructive",
        title: "Ocorreu um error",
        description: "Ocorreu um erro ao tentar criar nova demanda.",
      });
    },
    params.id
  );

  const onSubmit = (data: CreateDemand) => {
    const demandData: CreateDemand = {
      name: data.name,
      description: data.description,
      // links: data.links
      //     ? Array.isArray(data.links)
      //         ? data.links
      //         : [data.links]
      //     : [],
      public: data.public,
      keywords: selectedKeywords,
    };
    mutate(demandData);
  };

  const handleRedirect = () => {
    router.back();
  };

  return (
    <main className="p-8 w-full flex justify-center">
      <section className="max-w-7xl w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="hover:text-blue-strong"
                href="/minhas-demandas"
              >
                Minhas demandas
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary font-bold">
                Editar demandas
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex mb-4">
          <h1 className="text-4xl font-bold text-blue-strong">
            Editar demanda
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
                {...register("name", { required: false })}
                type="text"
                placeholder="Título do projeto"
                className="w-full py-3 px-4 text-base font-medium rounded-lg border mt-2"
                defaultValue={demanda?.name}
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
                {...register("description", { required: false })}
                placeholder="Digite o texto..."
                rows={4}
                className="w-full py-3 px-4 text-base font-normal border rounded-lg mt-2"
                defaultValue={demanda?.description}
              />
            </label>

            {demanda && (
              <div className="flex gap-2 items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    {...register("public")}
                    type="checkbox"
                    defaultChecked={demanda?.public}
                    value=""
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Demanda Pública?
                  </span>
                </label>

                <Tooltip>
                  <TooltipTrigger>
                    <FiInfo color="#6E6893" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-black/80 max-w-60">
                    Demandas públicas são visíveis para todos os usuários do
                    site.
                  </TooltipContent>
                </Tooltip>
              </div>
            )}

            {errors.links && <span>This field is required</span>}
            <label className="font-bold text-blue-strong mt-4">
              Link
              <input
                type="url"
                placeholder="Informe link da demanda"
                className="w-full py-3 px-4 text-base font-normal rounded-lg border mt-2"
                {...register("links", { required: false })}
                defaultValue={demanda?.links}
              />
            </label>

            <div className="font-bold text-base text-blue-strong">
              <label>Anexo</label>
              <div className="flex items-center mt-2">
                <Button className="rounded-full py-2.5 px-8">
                  Adicionar anexo
                </Button>
              </div>
            </div>

            {selectedKeywords.length > 0 && (
              <Keywords
                onChange={setSelectedKeywords}
                defaultValue={selectedKeywords}
              />
            )}

            {errors.description && <span>This field is required</span>}

            <div className="flex flex-row gap-4 justify-center mt-10">
              <Button
                type="submit"
                className="rounded-full py-2.5 px-8"
                disabled={isPending}
              >
                {isPending ? "Editando..." : "Editar demanda"}
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

export default EditarDemanda;
