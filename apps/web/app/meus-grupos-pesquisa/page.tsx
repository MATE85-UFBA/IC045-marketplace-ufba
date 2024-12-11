"use client";

import { MyResearchGroupList } from "@/components/MyResearchGroupList";
import MeusGruposPesquisaFilter from "@/modules/meus-grupos-pesquisa/components/filter/meusGruposPesquisaFilter";
import { Button } from "@/components/ui/button";
import { CustomIcon } from '@/modules/components/icon/customIcon';
import { IoIosAddCircleOutline } from 'react-icons/io';
import useGetMyResearchGroups from '@/api/research-group/use-get-my-research-group';


function MeusGruposPesquisa() {
   /*
    const researchgroups = [
        {
            id: 1,
            name: "Lasid",
            img: ""
        },
        {
            id: 2,
            name: "Onda Digital",
            img: ""
        }
    ]
  */

    const { data: pesquisador }  = useGetMyResearchGroups();

    console.log(pesquisador);
    
    return <main className='flex justify-center flex-grow m-8'>
        <section className="flex flex-col w-full max-w-7xl pt-12 gap-6">
          <div className="flex justify-between">
            <h1 className="font-bold text-2xl text-blue-strong sm:text-4xl">
              Meus Grupos de Pesquisa
            </h1>
            <Button className="rounded-full">
              <CustomIcon icon={IoIosAddCircleOutline} className="!size-5" /> Novo grupo de pesquisa
            </Button>
          </div>
          <MeusGruposPesquisaFilter />
          
          { pesquisador && 
            <MyResearchGroupList pesquisador={pesquisador} />}
        </section>
    </main>
}

export default MeusGruposPesquisa