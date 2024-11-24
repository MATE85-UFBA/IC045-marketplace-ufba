"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";

import "../../../app/globals.css";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { FiMenu } from "react-icons/fi";

interface props {
  userType: string;
} //todo remover

const Header = ({ userType }: props) => {
  const isDesktop = useMediaQuery('(min-width: 64rem)');
  const isLogged: boolean = false; //todo remover

  return isDesktop ? (
    <header className="flex justify-center shadow-custom bg-white">
      <div className="flex justify-evenly p-4 content-center w-full max-w-7xl">
        <div>
          <Link href={"/"} className="flex items-center gap-3">
            <img src="/logo.png" alt="logo ufba" />
            <h1 className="text-3xl font-bold text-blue-strong">Nexus</h1>
          </Link>
        </div>
        <div className="flex gap-5 items-center">
          {isLogged && userType == "pesquisador" ? (
            <>
              <Link
                href={"/encontrar-demandas"}
                className="items-center font-bold text-blue-strong"
              >
                Encontrar Demandas
              </Link>
              <Link
                href={"/"}
                className="items-center font-bold text-blue-strong"
              >
                Minhas Propostas
              </Link>
              <Link
                href={"/"}
                className="items-center font-bold text-blue-strong"
              >
                Meus Grupos de pesquisa
              </Link>
            </>
          ) : isLogged && userType === "empresa" ? (
            <>
              <Link
                href={"/"}
                className="items-center font-bold text-blue-strong"
              >
                Encontrar Grupos de Pesquisa
              </Link>
              <Link
                href={"/"}
                className="items-center font-bold text-blue-strong"
              >
                Minhas Demandas
              </Link>
            </>
          ) : (
            <>
              <Link
                href={"/encontrar-demandas"}
                className="items-center font-bold text-blue-strong"
              >
                Encontrar Demandas
              </Link>
              <Link
                href={"/"}
                className="items-center font-bold text-blue-strong"
              >
                Encontrar Grupo de Pesquisa
              </Link>
            </>
          )}
        </div>
        <div className="flex gap-2.5 items-center content-center">
          {isLogged ? (
            "Perfil"
          ) : (
            <>
              <Button
                variant={"outline"}
                asChild
                className="rounded-full py-2.5 px-8 border-primary"
              >
                <Link
                  href={"/login"}
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
            </>
          )}
        </div>
      </div>
    </header>
  ) : (
    <Drawer direction="right">
      <header className="flex justify-between shadow-custom bg-white p-4">
        <Link href={"/"} className="flex items-center gap-3">
          <img src="/logo.png" alt="logo ufba" />
          <h1 className="text-3xl font-bold text-blue-strong">Nexus</h1>
        </Link>
        <DrawerTrigger>
          <FiMenu className="text-primary text-3xl" />
        </DrawerTrigger>
      </header>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <DrawerClose asChild>
              <Link href={"/"} className="flex items-center justify-center gap-3 py-4">
                <img src="/logo.png" alt="logo ufba" />
                <h1 className="text-3xl font-bold text-blue-strong">Nexus</h1>
              </Link>
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>

        <nav className="px-4 space-y-4">
          <ul className="flex flex-col gap-4">
            <DrawerClose className="text-left" asChild>
              <Link
                href={"/encontrar-demandas"}
                className="items-center font-bold text-blue-strong"
              >
                Encontrar Demandas
              </Link>
            </DrawerClose>
            <DrawerClose className="text-left" asChild>
              <Link
                href={"/"}
                className="items-center font-bold text-blue-strong"
              >
                Encontrar Grupo de Pesquisa
              </Link>
            </DrawerClose>
          </ul>

          <Button
            variant={"outline"}
            asChild
            className="rounded-full w-full py-2.5 px-8 border-primary"
          >
            <Link
              href={"/"}
              className="font-medium text-primary text-base"
            >
              Entrar
            </Link>
          </Button>

          <Button asChild className="rounded-full w-full py-2.5 px-8">
            <Link href={"/"} className="font-medium">
              Cadastar-se
            </Link>
          </Button>
        </nav>
      </DrawerContent>

    </Drawer>
  );
};

export default Header;
