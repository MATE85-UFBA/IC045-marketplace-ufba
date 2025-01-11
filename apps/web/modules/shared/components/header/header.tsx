"use client";

import Link from 'next/link';
import { Button } from '@/modules/shared/ui/button';
import '../../../app/globals.css';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/modules/shared/ui/drawer';
import { FiMenu } from 'react-icons/fi';

import ufbaLogo from '@/public/logo.png';
import { TbBell, TbUserCircle } from 'react-icons/tb';
import { Popover, PopoverContent, PopoverTrigger } from '@/modules/shared/ui/popover';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Separator } from '@/modules/shared/ui/separator';
import Image from 'next/image';

const headerLinks = {
  none: [
    {

      label: "Encontrar demandas",
      path: "/encontrar-demandas",
    },
    {
      label: "Encontrar Grupos de Pesquisa",
      path: "/",
    },
  ],
  company: [
    {
      label: "Encontrar Grupos de Pesquisa",
      path: "/",
    },
    {

      label: "Minhas demandas",
      path: "/minhas-demandas",
    },
  ],
  researcher: [
    {
      label: "Encontrar demandas",
      path: "/encontrar-demandas",
    },
    {
      label: "Minhas Propostas",
      path: "/",
    },
    {
      label: "Meus Grupos de pesquisa",
      path: "/",
    },
  ],
};

type UserType = "none" | "company" | "researcher";

type User = {
  id: string;
  name: string;
  img?: string;
  utype: UserType;
};

type Notification = {
  id: string;
  title: string;
  datetime: Date;
};

const Header = () => {
  const isDesktop = useMediaQuery("(min-width: 64rem)");

  // Todo: Obter do localstorage que deve estar sempre atualizado
  // Todo: Criar context para user
  const user = {
    id: "",
    name: "",
    utype: "none",
  } as User;

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

  return isDesktop ? (
    <header className="flex justify-center shadow-custom bg-white">
      <div className="flex justify-between px-4 w-full max-w-7xl">
        <Link href={"/"} className="flex items-center gap-3 py-4">
          <Image src={ufbaLogo} alt="logo ufba" />
          <h1 className="text-3xl font-bold text-blue-strong">COOPERA-UFBA</h1>
        </Link>
        <div className="flex gap-5 items-center">
          {headerLinks[user.utype].map((link, index) => (
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
          {user.utype === "none" ? (
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
                  <Link href={"/"} className="font-medium hover:underline">

                    Meu perfil

                  </Link>
                  <Link href={"/"} className="font-medium hover:underline">
                    Sair
                  </Link>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </header>
  ) : (
    <Drawer direction="right">
      <header className="flex justify-between shadow-custom bg-white p-4">
        <Link href={"/"} className="flex items-center gap-3">
          <Image src={ufbaLogo} alt="logo ufba" />
          <h1 className="text-3xl font-bold text-blue-strong">COOPERA-UFBA</h1>
        </Link>
        <DrawerTrigger>
          <FiMenu className="text-primary text-3xl" />
        </DrawerTrigger>
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
          {headerLinks[user.utype].map((link, index) => (
            <DrawerClose key={index} className="text-left" asChild>
              <Link
                href={link.path}
                className="items-center font-bold text-blue-strong"
              >
                {link.label}
              </Link>
            </DrawerClose>
          ))}

          {user.utype === "none" ? (
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
                  href="/"
                  className="items-center font-bold text-blue-strong"
                >

                  Meu perfil

                </Link>
              </DrawerClose>
              <DrawerClose className="text-left" asChild>
                <Link
                  href="/"
                  className="items-center font-bold text-blue-strong"
                >
                  Sair
                </Link>
              </DrawerClose>
            </>
          )}
        </nav>
      </DrawerContent>
    </Drawer>
  );
};

export default Header;
