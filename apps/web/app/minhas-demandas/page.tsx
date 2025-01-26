"use client";
import { Button } from "@/components/ui/button";
import { CustomIcon } from "@/modules/components/icon/customIcon";
import MinhasDemandasFilter from "@/modules/minhas-demandas/components/filter/minhasDemandasFilter";
import MinhasDemandasTable from "@/modules/minhas-demandas/components/table/minhasDemandasTable";
import { IoIosAddCircleOutline } from "react-icons/io";
import useGetMyDemands from "@/api/demandas/use-get-my-demands";
import { useRouter } from "next/navigation";
import useDeleteDemand from "@/api/demandas/use-delete-demand";
import { useToast } from "@/hooks/use-toast";
import useGetMyFilterDemands from "@/api/demandas/use-get-my-filter-demands";
import { useState } from "react";
import { Demanda } from "@/modules/minhas-demandas/interfaces/demanda";

const MinhasDemandas = () => {
  const { data: demands = [] } = useGetMyDemands();
  const [filter, setFilter] = useState<string>("");
  const [filteredDemands, setFilteredDemands] = useState<Demanda[]>();
  const router = useRouter();
  const { toast } = useToast();

  const deleteDemandaMutation = useDeleteDemand(
    () => toast({ title: "Demanda removida com sucesso!", variant: "success" }),
    () =>
      toast({
        title: "Não foi possivel remover demanda.",
        variant: "destructive",
      })
  );

  const handleRedirect = () => {
    router.push("/cadastro-demandas"); // Navigates to the "about" page
  };

  const handleDelete = async (id: string) => {
    deleteDemandaMutation.mutate(id);
  };

  const handleEdit = (id: string) => {
    router.push(`/minhas-demandas/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/minhas-demandas/${id}`);
  };  

  const filterDemands = useGetMyFilterDemands(
    (data) => {
      setFilteredDemands(data);
      toast({ title: "Demandas buscadas com sucesso!" });
    },
    () => toast({ title: "Falha na Busca!" })
  );

  const handleFilter = () => {
    filterDemands.mutate(filter);
  };

  return (
    <main className="flex justify-center flex-grow m-8">
      <section className="flex flex-col w-full max-w-7xl pt-12 gap-6">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl text-blue-strong sm:text-4xl">
            Minhas demandas
          </h1>
          <Button className="rounded-full" onClick={handleRedirect}>
            <CustomIcon icon={IoIosAddCircleOutline} className="!size-5" /> Nova
            demanda
          </Button>
        </div>
        <MinhasDemandasFilter
          setFilter={setFilter}
          handleFilter={handleFilter}
        />
        <MinhasDemandasTable
          data={filteredDemands && filter !== "" ? filteredDemands : demands}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </section>
    </main>
  );
};

export default MinhasDemandas;
