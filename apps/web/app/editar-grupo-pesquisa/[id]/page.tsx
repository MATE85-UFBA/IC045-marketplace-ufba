"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import useGetAllKnowledgeAreas from '@/api/research-group/use-get-all-knowledgeAreas';
import { CreateResearchGroup } from '@/types/researchGroup';
import { useToast } from '@/hooks/use-toast';
import { handleFileUpload } from '@/api/research-group/use-upload-file';
import useGetOneResearchGroup from '@/api/research-group/use-get-one-research-group';
import { useParams, useRouter } from 'next/navigation';
import useEditResearchGroup from '@/api/research-group/use-edit-research-group';

const EditarGruposPesquisa = () => {
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
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleFileChange = async (event: any) => {
    setFile(event.target.files[0]);
  };

  useEffect(() => {
    setValue("knowledgeArea", knowledgeArea);
  }, [knowledgeArea, setValue]);

  useEffect(() => {
    setAreas(knowledgeAreas || []);
  }, [knowledgeAreas]);

  const params = useParams<{ id: string }>();
  const infosResearchGroup = useGetOneResearchGroup(params.id);

  const { mutate, isPending } = useEditResearchGroup(
    () => {
      toast({
        title: "Sucesso",
        description: "O grupo de pesquisa foi editado com sucesso.",
        variant: "success",
      });
    },
    () => {
      toast({
        variant: "destructive",
        title: "Ocorreu um erro",
        description: "Ocorreu um erro ao tentar editar novo grupo de pesquisa.",
      });
    },
    params.id
  );

  useEffect(() => {
    if (infosResearchGroup.data) {
      setValue("name", infosResearchGroup.data.name);
      setValue("description", infosResearchGroup.data.description);
      setValue("urlCNPQ", infosResearchGroup.data.urlCNPQ);
      if (infosResearchGroup.data.knowledgeAreas && infosResearchGroup.data.knowledgeAreas.length > 0) {
        setKnowledgeArea(infosResearchGroup.data.knowledgeAreas[0].name);
      }
    }
  }, [infosResearchGroup.data]);

  const onSubmit = async (data: CreateResearchGroup) => {
  let filename = null
    if(file){
       filename = await handleFileUpload(file);
    }
    const researchGroupData = {
      name: data.name,
      description: data.description,
      knowledgeArea: [data.knowledgeArea],
      urlCNPQ: data.urlCNPQ,
      img: filename,
    };

    mutate(researchGroupData);
    router.push("/meus-grupos-pesquisa");
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
                Editar Grupo de Pesquisa
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex mb-4">
          <h1 className="text-4xl font-bold text-blue-strong">
          Editar Grupo de Pesquisa
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
                {...register("name")}
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
                {...register("description")}
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
                {...register("knowledgeArea")}
              >
                <SelectTrigger className="w-full py-6 px-4 text-base font-medium rounded-lg border mt-2 data-[placeholder]:text-muted-foreground">
                  { knowledgeArea &&
                  <SelectValue placeholder={knowledgeArea} />
                  }
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem value={area.id} key={area.id}>{area.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.knowledgeArea && (
                <span className="text-red font-normal text-sm">
                  Área de Pesquisa é obrigatória
                </span>
              )}
            </label>
              <div className="font-bold text-base mt-4 text-blue-strong">
                <label>Foto de perfil</label>
                <div className="flex items-center mt-4">
                  <input type="file" onChange={handleFileChange} multiple={false}/>
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

            <div className="flex gap-4 justify-center mt-10">
              <Button
                type="submit"
                className="rounded-full py-2.5 px-8"
                disabled={isPending}
              >
                {isPending ? "Editando..." : "Editar Grupo de Pesquisa"}
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

export default EditarGruposPesquisa;
