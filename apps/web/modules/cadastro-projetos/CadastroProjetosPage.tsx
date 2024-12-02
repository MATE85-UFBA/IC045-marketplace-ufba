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

import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

const CadastrarProjeto = () => {
  // Tipagem simulada para evitar erro
  type CreateProjeto = {
    titulo: string;
    keywords: string;
    descricao: string;
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateProjeto>();

  const {toast} = useToast();

  // Função mock para substituir o backend
  const onSubmit = (data: CreateProjeto) => {
    console.log("Dados enviados (mock):", data);
    toast({title: "Projeto cadastrada (mock). Backend ainda não implementado."});
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
                {...register("titulo", { required: true })}
                type="text"
                placeholder="Título do projeto"
                className="w-full py-3 px-4 text-base font-medium rounded-lg border mt-2"
              />
              {errors.titulo && (
                <span className="text-red font-normal text-sm">
                  Titulo é obrigatório
                </span>
              )}
            </label>


            <label className="font-bold text-blue-strong mt-4">
              Descrição*
              <textarea
                {...register("descricao", { required: true })}
                placeholder="Digite o texto..."
                rows={4}
                className="w-full py-3 px-4 text-base font-normal border rounded-lg mt-2"
              />
            </label>

            {errors.descricao && <span>Este Campo é obrigatório</span>}

            {errors.keywords && <span>Este Campo é obrigatório</span>}
            <label className="font-bold text-blue-strong mt-4">
              Palavras-Chave (Separadas por vírgula)
              <input
                type="text"
                placeholder="Ex: Palavra-Chave 1, Palavra-Chave 2"
                className="w-full py-3 px-4 text-base font-normal rounded-lg border mt-2"
                {...register("keywords", { required: true })}
              />
            </label>

            <div className="flex gap-4 justify-center mt-10">
              <Button
                variant={"outline"}
                className="rounded-full py-2.5 px-8"
                type="reset"
              >
                Cancelar
              </Button>
              <Button type="submit" className="rounded-full py-2.5 px-8">
                Cadastrar projeto
              </Button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default CadastrarProjeto;
