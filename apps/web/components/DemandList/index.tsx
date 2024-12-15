import { Item } from "./Item";
import { Demanda } from "@/modules/minhas-demandas/interfaces/demanda";

type DemandListProps = {
  demands: Demanda[];
};

function DemandList({ demands }: DemandListProps) {
  return (
    <ul className="flex flex-col gap-6">
      {demands.length ? (
        demands.map((demand) => <Item key={demand.id} {...demand} />)
      ) : (
        <div className="px-4 py-5 bg-white border rounded-xl">
          Não há demandas no momento
        </div>
      )}
    </ul>
  );
}

export { DemandList };
