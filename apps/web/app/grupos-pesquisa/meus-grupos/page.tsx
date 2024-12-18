"use client";

import { MyResearchGroupList } from "@/components/MyResearchGroupList";
import MeusGruposPesquisaFilter from "@/modules/meus-grupos-pesquisa/components/filter/meusGruposPesquisaFilter";
import { Button } from "@/components/ui/button";
import { CustomIcon } from '@/modules/shared/components/icon/customIcon';
import { IoIosAddCircleOutline } from 'react-icons/io';
import useGetMyResearchGroups from '@/api/research-group/use-get-my-research-group';
import { useState } from "react";


function MeusGruposPesquisa() {

    const [search, setSearch] = useState("");
    const [order, setOrder] = useState<'asc' | 'desc'>("asc");
    const { data: pesquisador }  = useGetMyResearchGroups(search, order);

    function handleSearch() {
        const searchValue = document.querySelector('input')?.value;
        setSearch(searchValue ?? "");
    }


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
          <MeusGruposPesquisaFilter handleSearch={handleSearch} setOrder={ setOrder } order={ order } />

          { pesquisador &&
            <MyResearchGroupList pesquisador={pesquisador} />}
        </section>
    </main>
}

export default MeusGruposPesquisa