"use client";
import { Button } from '@/components/ui/button';
import { CustomIcon } from '@/modules/components/icon/customIcon';
import MinhasDemandasFilter from '@/modules/minhas-demandas/components/filter/minhasDemandasFilter';
import MinhasDemandasTable from '@/modules/minhas-demandas/components/table/minhasDemandasTable';
import { IoIosAddCircleOutline } from 'react-icons/io';
import useGetMyDemands from '@/api/use-get-my-demands';

const MinhasDemandas = () => {
  const { data: demands = [] }  = useGetMyDemands();

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
        <MinhasDemandasTable data={demands} />
      </section>
    </main>
  );
};

export default MinhasDemandas;
