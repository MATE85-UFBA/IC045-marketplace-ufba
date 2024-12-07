import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowForward } from "react-icons/io";
import { TbUserCircle } from 'react-icons/tb';
import { Button } from '../ui/button';
import { ResearchGroup } from './type';

function Item(researchgroup: ResearchGroup) {
    return <li className="px-4 py-5 bg-white border rounded-2xl">
        <div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-1.5">
            {
                researchgroup.image
                    ? <Image src="" alt="Logo do Grupo de Pesquisa" className="row-span-2 col-start-1 row-start-1" />
                    : <TbUserCircle className="text-primary font-normal size-16 row-span-2 col-start-1" />
            }
            <h2 className="self-end font-semibold text-lg leading-none gap-3">{researchgroup.name}</h2>
            <p className="px-3 py-2 bg-border rounded-full text-xs">Líder</p>
        </div>
    </li>
}

export { Item };