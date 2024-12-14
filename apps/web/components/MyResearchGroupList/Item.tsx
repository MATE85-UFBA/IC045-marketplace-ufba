import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { TbUserCircle } from 'react-icons/tb';
import { ResearchGroup } from './type';
import { Button } from '../ui/button';

interface ItemProp{
    idPesquisador: string;
    researchgroup: ResearchGroup;
}

function Item({idPesquisador,researchgroup}:ItemProp) {
    return <li className="px-4 py-5 bg-white border rounded-2xl">
        <div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-1.5">
            {
                researchgroup.image
                    ? <Image src="" alt="Logo do Grupo de Pesquisa" className="row-span-2 col-start-1 row-start-1" />
                    : <TbUserCircle className="text-primary font-normal size-16 row-span-2 col-start-1" />
            }
            <h2 className="self-end font-semibold text-lg leading-none gap-3">{researchgroup.name}</h2>
            <p className="px-3 py-2 justify-self-start bg-border rounded-full text-xs">{idPesquisador === researchgroup.leader.userId ? 'Líder' : 'Membro'}</p>
            
            <Button
                asChild
                variant={"outline"}
                className="px-9 py-2.5 rounded-full mt-3 xs:mt-0"
            >
                <Link href={`/detalhe-grupo-pesquisa/${researchgroup.id}`}>
                ver mais
                </Link>

            </Button>
        </div>
    </li>
}

export { Item };