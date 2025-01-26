"use client";

import useAddMember from "@/api/projects/use-add-project";
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
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import { CreateMember } from "@/types/project";
import { useParams, useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { MemberFormData } from "./types/member-form-data";
import useGetAllMembers from "@/api/researchers/use-get-all-researchers";
import Keywords from "@/components/keywords";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

const CadastrarMembro = () => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [member, setMembers] = useState<{ id: string; name: string }[]>([]);
  const { data: members } = useGetAllMembers();

  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm<MemberFormData>();
  const { user } = useUser();

  useEffect(() => {
    setValue("member", member);
  }, [member, setValue]);

  useEffect(() => {
    setMembers(members || []);
  }, [members]);

  const { toast } = useToast();
  const params = useParams<{ id: string }>();
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }

  const { mutate } = useAddMember(
    () => {
      toast({
        variant: "success",
        title: "Sucesso",
        description: "O Membro foi cadastrado com sucesso.",
      });
      router.back();
    },
    () => {
      toast({
        variant: "destructive",
        title: "Ocorreu um error",
        description: "Ocorreu um erro ao tentar adicionar novo membro.",
      });
    }
  );

  const onSubmit = (data: MemberFormData) => {
    const memberData: CreateMember = {
      id: data.id,
      name: data.name,
    };

    mutate(memberData);
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
                Cadastrar Membros
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex mb-4">
          <h1 className="text-4xl font-bold text-blue-strong">
            Cadastrar Membro
          </h1>
        </div>
        <div className="p-4 bg-white shadow rounded-xl mt-4 h-[700] max-w-[1350]">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="font-bold text-blue-strong mt-4">
              Cadastrar Membro*
              <Select
                onValueChange={setMembers}
                {...register("member", { required: true })}
              >
                <SelectTrigger className="w-full py-6 px-4 text-base font-medium rounded-lg border mt-2 data-[placeholder]:text-muted-foreground">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {members.map((member) => (
                    <SelectItem value={member.id}>{member.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.member && (
                <span className="text-red font-normal text-sm">
                  Área de Pesquisa é obrigatória
                </span>
              )}
            </label>

            <div className="flex flex-row gap-4 justify-center mt-10">
              <Button type="submit" className="rounded-full py-2.5 px-8">
                Cadastrar membro
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

export default CadastrarMembro;
