"use client";

import ContactCompany from "@/modules/contactar-empresa";
import { useSearchParams } from "next/navigation";

const ContactarEmpresa = () => {
  const searchParams = useSearchParams();
  return <ContactCompany query={searchParams} />;
};

export default ContactarEmpresa;
