"use client";

import { format } from "date-fns";
import MinhasPropostasFilter from "./components/filter/minhasPropostasFilter";
import MinhasPropostasTable from "./components/table/minhasPropostasTable";
import { Proposta } from "./interfaces/proposta";

const MyProposalsPage = () => {
  const propostas: Proposta[] = [
    {
      id: "1",
      demand: "teste",
      company: "teste",
      researchGroup: "teste",
      status: "teste",
      createdAt: format(new Date(), "dd/MM/yyyy"),
    },
    {
      id: "2",
      demand: "teste",
      company: "teste",
      researchGroup: "teste",
      status: "teste",
      createdAt: format(new Date(), "dd/MM/yyyy"),
    },
    {
      id: "3",
      demand: "teste",
      company: "teste",
      researchGroup: "teste",
      status: "teste",
      createdAt: format(new Date(), "dd/MM/yyyy"),
    },
  ];
  return (
    <main className="flex flex-col flex-grow h-full w-full p-3 items-center">
      <section className="max-w-7xl w-full flex flex-col gap-4">
        <h2 className="text-blue-strong font-bold text-3xl">
          Minhas Propostas
        </h2>
        <MinhasPropostasFilter />
        <MinhasPropostasTable data={propostas} />
      </section>
    </main>
  );
};

export default MyProposalsPage;
