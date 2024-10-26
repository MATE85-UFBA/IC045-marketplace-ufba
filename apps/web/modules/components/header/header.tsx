import Link from "next/link";
import { Button } from "@/components/ui/button";

import "../../../app/globals.css";
const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignContent: "center",
        padding: "15px",
        boxShadow: "0px -6px 10px 5px #C6C2DE",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src="/logo.png" alt="logo ufba" />
        <h1 style={{ fontSize: "32px", fontWeight: "700" }}>Nexus</h1>
      </div>
      <div style={{ display: "flex", gap: "10px", alignContent: "center" }}>
        <Link href={"/"} style={{ alignContent: "center", fontWeight: "700" }}>
          Encontrar Demandas
        </Link>
        <Link href={"/"} style={{ alignContent: "center", fontWeight: "700" }}>
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
