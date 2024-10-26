import Link from "next/link";
import { Button } from "@/components/ui/button";

import "../../../app/globals.css";
const Header = () => {
  return (
    <header className="flex justify-evenly p-4 content-center shadow bg-white">
      <div>
        <Link href={"/"} className="flex items-center gap-3">
          <img src="/logo.png" alt="logo ufba" />
          <h1 className="text-3xl font-bold text-blue-strong">Nexus</h1>
        </Link>
      </div>
      <div className="flex gap-3 items-center">
        <Link href={"/"} className="items-center font-bold text-blue-strong">
          Encontrar Demandas
        </Link>
        <Link href={"/"} className="items-center font-bold text-blue-strong">
          Encontrar Grupo de Pesquisa
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          gap: "10px",
        }}
      >
        <Button
          variant={"outline"}
          asChild
          style={{
            borderRadius: " 64px",
            padding: "10px 36px 10px 36px",
            border: "1px solid var(--Roxo, #6D5BD0)",
          }}
        >
          <Link href={"/"} style={{ fontWeight: 500, color: "#6D5BD0" }}>
            Entrar
          </Link>
        </Button>
        <Button
          asChild
          style={{
            borderRadius: " 64px",
            padding: "10px 36px 10px 36px",
          }}
        >
          <Link href={"/"} style={{ fontWeight: 500 }}>
            Cadastar-se
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
