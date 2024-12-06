import { MyResearchGroupList } from "@/components/MyResearchGroupList";
import { ResearchGroup } from "@/components/MyResearchGroupListProps/type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomIcon } from '@/modules/components/icon/customIcon';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FiSearch } from "react-icons/fi";

function MeusGruposPesquisa() {
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

    return <main className='max-w-screen-xl px-8 m-auto grid grid-cols-[auto_1fr] md:gap-3'>
        <section className="flex flex-col w-full max-w-7xl pt-12 gap-6">
          <div className="flex justify-between">
            <h1 className="font-bold text-2xl text-blue-strong sm:text-4xl">
              Minhas Demandas
            </h1>
            <Button className="rounded-full" >
              <CustomIcon icon={IoIosAddCircleOutline} className="!size-5" /> Nova grupo de pesquisa
            </Button>
          </div>
        </section>
    </main>
}

export default MeusGruposPesquisa