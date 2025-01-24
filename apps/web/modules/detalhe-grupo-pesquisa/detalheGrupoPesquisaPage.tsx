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
import { IoIosAddCircleOutline } from 'react-icons/io';
import { CustomIcon } from '../components/icon/customIcon';
import MembersSection from './components/membersSection';
import { useParams, useRouter } from 'next/navigation';
import useGetResearchGroup from '@/api/grupos/use-get-research-group';
import React from 'react';
import ProjectsSection from './components/projectsSection';
import { TbUserCircle } from 'react-icons/tb';

const apiURL = process.env.NEXT_PUBLIC_API_URL || ''


enum ETabs {
  MEMBERS = "membros",
  PROJECTS = "projetos",
}
export default function DetalheGrupoPesquisaPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.id;

  const [selectedTab, setSelectedTab] = React.useState<ETabs>(ETabs.PROJECTS);

  const {
    data: researchGroup,
    isError,
    error,
    isLoading,
  } = useGetResearchGroup(groupId as string);
  const handleAddProject = () => {
    router.push(`/cadastro-projetos/${groupId}`);
  };
  const handleTabChange = (tab: ETabs) => {
    setSelectedTab(tab);
  };

  if (isError) {
    router.push("/404");
  }
  if (isLoading) {
    return (
      <main className="p-8 w-full flex justify-center flex-grow ">
        <h1>Carregando</h1>
      </main>
    );
  }

  console.log({researchGroup})

  const imageComponent = !!(researchGroup?.img) && researchGroup.img.includes("/uploads") ?
    <img
      src={`${apiURL}${researchGroup?.img}`}
      alt="Grupo de Pesquisa"
      className="max-w-[80%]"
    /> : <TbUserCircle className="text-primary font-normal size-16 row-span-2 col-start-1" />
  return (
    <main className="p-8 w-full flex justify-center flex-grow ">
      <section className="max-w-7xl w-full">
        <div className="flex  flex-col">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="hover:text-blue-strong"
                  href="/cadastro-projetos"
                >
                  Grupos de Pesquisa
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary font-bold">
                  Detalhes do Grupo de Pesquisa
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex mb-4 justify-between center">
            <h1 className="text-4xl font-bold text-blue-strong">
              {researchGroup?.name}
            </h1>

            <Button className="rounded-full" onClick={handleAddProject}>
              <CustomIcon icon={IoIosAddCircleOutline} className="!size-5" />{" "}
              Novo Projeto
            </Button>
          </div>
        </div>

        <div className="flex w-[100%] gap-5">
          <div className="flex gap-5 p-5 items-center justify-center flex-col max-w-[30%] bg-[#fff] border-[2px] rounded-md border-[#C6C2DE]">
            {imageComponent}

            <h1 className="font-size-lg text-2xl">{researchGroup?.name}</h1>

            <p>{researchGroup?.description}</p>
          </div>

          <div className="flex flex-col gap-5 w-[100%]">
            <div className="flex gap-5">
              <Button
                className="rounded-full"
                onClick={() => {
                  handleTabChange(ETabs.PROJECTS);
                }}
              >
                Projetos
              </Button>

              <Button
                className="rounded-full"
                onClick={() => {
                  handleTabChange(ETabs.MEMBERS);
                }}
              >
                Membros
              </Button>
            </div>
            {researchGroup ? (
              selectedTab == ETabs.MEMBERS ? (
                <MembersSection members={researchGroup?.members} />
              ) : (
                <ProjectsSection projects={researchGroup?.projects} />
              )
            ) : (
              <div>Carregando...</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
