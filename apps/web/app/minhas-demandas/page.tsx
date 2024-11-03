"use client";
import { Button } from "@/components/ui/button";
import { CustomIcon } from "@/modules/components/icon/customIcon";
import MinhasDemandasFilter from "@/modules/minhas-demandas/components/filter/minhasDemandasFilter";
import MinhasDemandasTable from "@/modules/minhas-demandas/components/table/minhasDemandasTable";
import { Demanda } from "@/modules/minhas-demandas/interfaces/demanda";
import { IoIosAddCircleOutline } from "react-icons/io";

const MinhasDemandas = () => {
  const data: Demanda[] = [
    {
      id: 1,
      title: "Título1",
      status: "Aguardando contato",
      createdAt: "05 de out. de 2024",
    },
    {
      id: 2,
      title: "Título2",
      status: "Aguardando contato",
      createdAt: "05 de out. de 2024",
    },
    {
      id: 3,
      title: "Título3",
      status: "Aguardando contato",
      createdAt: "05 de out. de 2024",
    },
    {
      id: 4,
      title: "Título4",
      status: "Aguardando contato",
      createdAt: "05 de out. de 2024",
    },
  ];
  return (
    <main className="flex justify-center ">
      <section className="flex flex-col w-full max-w-7xl pt-12 gap-6">
        <div className="flex justify-between">
          <h1 className="font-bold text-4xl text-blue-strong">
            Minhas Demandas
          </h1>
          <Button className="rounded-full">
            <CustomIcon icon={IoIosAddCircleOutline} className="!size-5" /> Nova
            demanda
          </Button>
        </div>
        <MinhasDemandasFilter />
        <MinhasDemandasTable data={data} />
      </section>
    </main>
  );
};

export default MinhasDemandas;
