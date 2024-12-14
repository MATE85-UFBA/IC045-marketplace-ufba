import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { TbUserCircle } from "react-icons/tb";
import { ResearchGroup } from "./types";
import { FaImagePortrait } from "react-icons/fa6";

function truncate(str: string, n: number, useWordBoundary: boolean) {
  if (str.length <= n) {
    return str;
  }
  const subString = str.slice(0, n - 1); // the original check
  return (
    (useWordBoundary
      ? subString.slice(0, subString.lastIndexOf(" "))
      : subString) + "..."
  );
}

function Item(researchgroup: ResearchGroup) {
  return (

    <li className="px-8 py-6 bg-white border rounded-2xl">
      <div className="flex xs:items-center justify-between mb-4 flex-col xs:flex-row">
        <h2 className="text-2xl font-semibold">{researchgroup.name}</h2>
      </div>

      <p className="mb-8 text-justify">
        {truncate(researchgroup.description, 200, true)}
      </p>

      <Button
        asChild
        variant={"outline"}
        className="px-9 py-2.5 rounded-full mt-3 xs:mt-0"
      >
        <Link href={`/detalhe-grupo-pesquisa/${researchgroup.id}`}>
          ver mais
        </Link>

      </Button>
    </li>
  );
}

export { Item };
