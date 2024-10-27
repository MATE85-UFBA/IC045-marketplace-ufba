import Link from "next/link";
import { Button } from "@/components/ui/button";

import "../../../app/globals.css";
const Header = () => {
  return (
    <header className="flex justify-center shadow-custom bg-white">
      <div className="flex justify-evenly p-4 content-center w-full max-w-7xl">
        <div>
          <Link href={"/"} className="flex items-center gap-3">
            <img src="/logo.png" alt="logo ufba" />
            <h1 className="text-3xl font-bold text-blue-strong">Nexus</h1>
          </Link>
        </div>
        <div className="flex gap-5 items-center">
          <Link href={"/"} className="items-center font-bold text-blue-strong">
            Encontrar Demandas
          </Link>
          <Link href={"/"} className="items-center font-bold text-blue-strong">
            Encontrar Grupo de Pesquisa
          </Link>
        </div>
        <div className="flex gap-2.5 items-center content-center">
          <Button
            variant={"outline"}
            asChild
            className="rounded-full py-2.5 px-8 border-primary"
          >
            <Link
              href={"/"}
              className="font-medium text-primary bg-white text-base"
            >
              Entrar
            </Link>
          </Button>
          <Button asChild className="rounded-full py-2.5 px-8">
            <Link href={"/"} className="font-medium">
              Cadastar-se
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
