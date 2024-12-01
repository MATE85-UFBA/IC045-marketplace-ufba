"use client";
import { Button } from "@/components/ui/button";
import { CustomIcon } from "@/modules/components/icon/customIcon";
import MinhasDemandasFilter from "@/modules/minhas-demandas/components/filter/minhasDemandasFilter";
import MinhasDemandasTable from "@/modules/minhas-demandas/components/table/minhasDemandasTable";
import { IoIosAddCircleOutline } from "react-icons/io";
import useGetMyDemands from "@/api/use-get-my-demands";
import { useRouter } from "next/navigation";
import useDeleteDemand from "@/api/use-delete-demand";

const MinhasDemandas = () => {
  const { data: demands = [] } = useGetMyDemands();
  const router = useRouter();

  const deleteDemandaMutation = useDeleteDemand(
    () => alert("Demanda removida com sucesso!"),
    () => alert("Não foi possivel remover demanda.")
  );

  const handleRedirect = () => {
    router.push("/cadastro-demandas"); // Navigates to the "about" page
  };

  const handleDelete = async (id: string) => {
    const shouldDelete = confirm(
      "Tem certeza que deseja remover essa demanda?"
    );

    if (shouldDelete) {
      deleteDemandaMutation.mutate(id);

      router.push("/minhas-demandas");
    }
  };

  return (
    <main className="flex justify-center flex-grow m-8">
      <section className="flex flex-col w-full max-w-7xl pt-12 gap-6">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl text-blue-strong sm:text-4xl">
            Minhas Demandas
          </h1>
          <Button className="rounded-full" onClick={handleRedirect}>
            <CustomIcon icon={IoIosAddCircleOutline} className="!size-5" /> Nova
            demanda
          </Button>
        </div>
        <MinhasDemandasFilter />
        <MinhasDemandasTable
          data={demands}
          onEdit={() => undefined}
          onDelete={handleDelete}
        />
      </section>
    </main>
  );
};

export default MinhasDemandas;
