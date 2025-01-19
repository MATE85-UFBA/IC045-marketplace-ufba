"use client";
import ContactResearchGroup from "@/modules/contactar-grupo-pesquisa/components";
import { useSearchParams } from "next/navigation";

const ContactarGrupoPesquisa = () => {
  const searchParams = useSearchParams();
  return <ContactResearchGroup query={searchParams} />;
};

export default ContactarGrupoPesquisa;
