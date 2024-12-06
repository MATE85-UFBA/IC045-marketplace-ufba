import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { TbUserCircle } from "react-icons/tb";
import { ResearchGroup } from "./type";
import { FaImagePortrait } from "react-icons/fa6";

function truncate( str: string, n: number, useWordBoundary :boolean){
    if (str.length <= n) { return str; }
    const subString = str.slice(0, n-1); // the original check
    return (useWordBoundary 
      ? subString.slice(0, subString.lastIndexOf(" ")) 
      : subString) + "...";
  };

function Item(researchgroup: ResearchGroup) {
    return <li className="px-8 py-10 bg-white border rounded-2xl">
        <div className="flex xs:items-center justify-between mb-8 flex-col xs:flex-row">
            <h2 className="text-3xl font-semibold">{researchgroup.name}</h2>
        </div>
{/*
        {
            researchgroup.knowlegdeAreas.length > 0 &&
            <ul className="mb-8 flex gap-2">
                {researchgroup.knowlegdeAreas.map(knowlegdearea => <li key={knowlegdearea.id} className="px-3 py-2 text-center bg-border rounded-full text-xs">{knowlegdearea.name}</li>)}
            </ul>

        }
*/}
        <p className="mb-8">{truncate(researchgroup.description,200,true)}</p>

        <Button asChild variant={'outline'} className="px-9 py-2.5 rounded-full mt-3 xs:mt-0">
            <Link href={'/'}>ver mais</Link>
        </Button>

    </li>
}

export { Item }