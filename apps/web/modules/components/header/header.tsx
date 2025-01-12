"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import "../../../app/globals.css";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FiMenu } from "react-icons/fi";

import ufbaLogo from "@/public/logo.png";
import { TbBell, TbUserCircle } from "react-icons/tb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context/UserContext";
import { authStore } from "@/context/loginContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

const headerLinks = {
  NONE: [
    {
      label: "Encontrar demandas",
      path: "/encontrar-demandas",
    },
    {
      label: "Encontrar Grupos de Pesquisa",
      path: "/encontrar-grupo-pesquisa",
    },
  ],
  COMPANY: [
    {
      label: "Encontrar Grupos de Pesquisa",
      path: "/encontrar-grupo-pesquisa",
    },
    {
      label: "Minhas demandas",
      path: "/minhas-demandas",
    },
  ],
  RESEARCHER: [
    {
      label: "Encontrar demandas",
      path: "/encontrar-demandas",
    },
    // {
    //   label: "Minhas Propostas",
    //   path: "/minhas-propostas",
    // },
    {
      label: "Meus Grupos de pesquisa",
      path: "/meus-grupos-pesquisa",
    },
  ],
  ADMIN: [
    {
      label: "Painel Administrativo",
      path: "/painel-administrativo",
    },
  ],
};

type Notification = {
  id: string;
  title: string;
  datetime: Date;
};

const Header = () => {
  const isDesktop = useMediaQuery("(min-width: 64rem)");

  const router = useRouter();

  const { user, setUser } = useUser();

  const formatName = (name: string) => {
    const firstName = name.split(" ")[0];
    return (
      <p className="self-center text-primary font-bold">
        Olá,{" "}
        {firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()}
      </p>
    );
  };

  const linksType = user
    ? user.role === "ADMIN"
      ? "ADMIN"
      : user.utype
    : "NONE";

  const notifications = [
    {
      id: "1",
      title: "Proposta recebida para [Nome da demanda]!",
      datetime: new Date(),
    },
    {
      id: "2",
      title: "Proposta recebida para [Nome da demanda]!",
      datetime: new Date(),
    },
    {
      id: "3",
      title: "Proposta recebida para [Nome da demanda]!",
      datetime: new Date(),
    },
  ] as Notification[];

  function handleLogout() {
    authStore.logout();
    setUser(null);
    router.push("/");
  }

  return isDesktop ? (
    <header className="flex justify-center shadow-custom bg-white z-50">
      <div className="flex justify-between px-4 w-full max-w-screen-xl">
        <Link href={"/"} className="flex items-center gap-3 py-4">
          <Image src={ufbaLogo} alt="logo ufba" />
          <h1 className="text-3xl font-bold text-blue-strong">COOPERA-UFBA</h1>
        </Link>
        <div className="flex gap-5 items-center">
          {headerLinks[linksType].map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className="h-full content-center px-2 font-bold text-blue-strong border-y-4 border-transparent hover:border-b-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-2.5 items-center content-center">
          {linksType === "NONE" ? (
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
                <Link href={"/user-register"} className="font-medium">
                  Cadastar-se
                </Link>
              </Button>
            </>
          ) : (
            <div className="flex gap-2">
              {user?.name ? formatName(user.name) : ""}
              <Popover>
                <PopoverTrigger>
                  <TbBell className="text-primary/80 hover:text-primary size-8 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent>
                  {notifications.length > 0 ? (
                    <>
                      <ul className="space-y-3 max-h-44 px-2 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
                        {notifications.map((notification) => (
                          <>
                            <li key={notification.id} className="flex flex-col">
                              <Link
                                href={`/notificacao/${notification.id}`}
                                className="text-sm hover:underline"
                              >
                                {notification.title}
                              </Link>
                              <small className="text-blue-light text-xs">
                                {formatDistanceToNow(notification.datetime, {
                                  locale: ptBR,
                                })}
                              </small>
                            </li>
                            <Separator />
                          </>
                        ))}
                      </ul>
                      <Link
                        href={"notificacao"}
                        className="text-center text-sm text-blue-light block pt-4 hover:text-blue-strong hover:underline"
                      >
                        Ver mais
                      </Link>
                    </>
                  ) : (
                    "Não há novas notificações"
                  )}
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger>
                  <TbUserCircle className="text-primary/80 hover:text-primary size-8 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="grid gap-2">
                  <Link
                    href={"/perfil"}
                    className="font-medium hover:underline text-blue-strong"
                  >
                    Meu perfil
                  </Link>
                  <Button
                    variant="link"
                    onClick={handleLogout}
                    className="font-medium hover:underline outline-none text-blue-strong text-base text-left p-0 justify-start h-auto"
                  >
                    Sair
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </header>
  ) : (
    <Drawer direction="right">
      <header className="shadow-custom bg-white p-4 z-50">
        <div className="flex justify-between max-w-screen-xl mx-auto">
          <Link href={"/"} className="flex items-center gap-3">
            <Image src={ufbaLogo} alt="logo ufba" />
            <h1 className="text-3xl font-bold text-blue-strong">
              COOPERA-UFBA
            </h1>
          </Link>
          <DrawerTrigger>
            <FiMenu className="text-primary text-3xl" />
          </DrawerTrigger>
        </div>
      </header>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <DrawerClose asChild>
              <Link
                href={"/"}
                className="flex items-center justify-center gap-3 py-4"
              >
                <Image src={ufbaLogo} alt="logo ufba" />
                <h1 className="text-3xl font-bold text-blue-strong">
                  COOPERA-UFBA
                </h1>
              </Link>
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>

        <nav className="flex flex-col gap-4 px-4">
          {headerLinks[linksType].map((link, index) => (
            <DrawerClose key={index} className="text-left" asChild>
              <Link
                href={link.path}
                className="items-center font-bold text-blue-strong"
              >
                {link.label}
              </Link>
            </DrawerClose>
          ))}

          {linksType === "NONE" ? (
            <>
              <Button
                variant={"outline"}
                asChild
                className="rounded-full w-full py-2.5 px-8 border-primary"
              >
                <Link
                  href={"/login"}
                  className="font-medium text-primary text-base"
                >
                  Entrar
                </Link>
              </Button>

              <Button asChild className="rounded-full w-full py-2.5 px-8">
                <Link href={"/user-register"} className="font-medium">
                  Cadastar-se
                </Link>
              </Button>
            </>
          ) : (
            <>
              <DrawerClose className="text-left" asChild>
                <Link
                  href="/"
                  className="items-center font-bold text-blue-strong"
                >
                  Notificações
                </Link>
              </DrawerClose>
              <DrawerClose className="text-left" asChild>
                <Link
                  href="/perfil"
                  className="items-center font-bold text-blue-strong"
                >
                  Meu perfil
                </Link>
              </DrawerClose>
              <DrawerClose className="text-left" asChild>
                <Button
                  variant="link"
                  onClick={handleLogout}
                  className="font-bold text-blue-strong outline-none text-base text-left p-0 justify-start h-auto"
                >
                  Sair
                </Button>
              </DrawerClose>
            </>
          )}
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default Header;
