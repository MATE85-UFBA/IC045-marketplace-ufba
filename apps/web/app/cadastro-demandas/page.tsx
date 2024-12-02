"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import useAddDemand from '@/api/use-add-demand';
import { CreateDemand } from '@/types/demand';
import { useToast } from '@/hooks/use-toast';


const CadastrarDemanda = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<CreateDemand>();
  const { toast } = useToast()

  const { mutate, isPending } = useAddDemand(
    () => {
      toast({
        title: "Sucesso",
        description: "A demanda foi cadastrada com sucesso."
      });
    },
    () => {
      toast({
        variant: 'destructive',
        title: "Ocorreu um error",
        description: "Ocorreu um erro ao tentar criar nova demanda."
      });
    }
  );

  const onSubmit = (data: CreateDemand) => {

    const demandData: CreateDemand = {
      name: data.name,
      description: data.description,
      links: data.links ? (Array.isArray(data.links) ? data.links : [data.links]) : [],
      public: data.public === "on",
    };

    mutate(demandData);
  };

  return (
      <main className="p-8 w-full flex justify-center">
        <section className="max-w-7xl w-full">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="hover:text-blue-strong" href="/minhas-demandas">
                  Minhas Demandas
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary font-bold">
                  Cadastrar Demandas
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex mb-4">
            <h1 className="text-4xl font-bold text-blue-strong">
              Cadastrar Demanda
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

              <div className="flex gap-2 items-center">
                <Switch {...register("public")} />
                <label>Demanda Pública? </label>
              </div>

              {errors.links && <span>This field is required</span>}
              <label className="font-bold text-blue-strong mt-4">
                Links Úteis
                <input
                  type="url"
                  placeholder="Informe links úteis"
                  className="w-full py-3 px-4 text-base font-normal rounded-lg border mt-2"
                  {...register("links", { required: false })}
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

              {errors.description && <span>This field is required</span>}

              <div className="flex gap-4 justify-center mt-10">
                <Button
                  variant={"outline"}
                  className="rounded-full py-2.5 px-8"
                  type="reset"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="rounded-full py-2.5 px-8" disabled={isPending}>
                  {isPending ? "Cadastrando..." : "Cadastrar demanda"}
                </Button>
              </div>
            </form>
          </div>
        </section>
      </main>
  );
};

export default CadastrarDemanda;
