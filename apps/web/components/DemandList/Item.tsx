import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { TbUserCircle } from 'react-icons/tb';
import { Button } from '../ui/button';
import { Address } from './types';
import { Demanda } from "@/modules/minhas-demandas/interfaces/demanda";

function addressToString(address?: Address) {
    if (!address) return;

    return `${address.city}, ${address.state} - ${address.country}`
}

function Item(demand: Demanda) {
    return <li className="px-4 py-5 bg-white border rounded-2xl">
        <div className="flex xs:items-center justify-between mb-8 flex-col xs:flex-row">
            <h2 className="text-3xl font-semibold">{demand.name}</h2>
            <Button asChild variant={'outline'} className="px-9 py-2.5 rounded-full mt-3 xs:mt-0">
                <Link href={'/encontrar-demandas'}>Entrar em contato</Link>
            </Button>
        </div>

        <p className="text-blue-light text-sm mb-4">Publicado {formatDistanceToNow(demand.createdAt, { locale: ptBR, addSuffix: true })}</p>

        <p className="mb-8">{demand.description}</p>

        {
            demand.keywords.length > 0 &&
            <ul className="mb-8 flex gap-2">
                {demand.keywords.map(keyword => <li key={keyword.id} className="px-3 py-2 text-center bg-border rounded-full text-xs">{keyword.name}</li>)}
            </ul>

        }

        <div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-1.5">
            {
                demand.company.image
                    ? <Image src="" alt="Logo da Empresa" className="row-span-2 col-start-1 row-start-1" />
                    : <TbUserCircle className="text-primary font-normal size-16 row-span-2 col-start-1" />
            }

            <p className="self-end font-semibold text-lg leading-none">{demand.company.name}</p>
            <p className="self-start text-blue-light text-sm">{addressToString(demand.company.address)}</p>
        </div>
    </li>
}

export { Item };
