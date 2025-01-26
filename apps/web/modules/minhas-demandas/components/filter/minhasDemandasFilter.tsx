import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomIcon } from "@/modules/components/icon/customIcon";

import { IoSearch } from "react-icons/io5";

interface Props {
  setFilter: (filter: string) => void;
  handleFilter: () => any;
}

const MinhasDemandasFilter = ({ setFilter, handleFilter }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex gap-2 w-full">
        <Input
          onBlur={(e) => setFilter(e.target.value)}
          className="bg-white px-4 h-12"
          placeholder="Buscar"
        />
        <Button onClick={handleFilter} className="size-12">
          <CustomIcon icon={IoSearch} className="!size-6" />
        </Button>
      </div>
      {/* //todo lógica de mais recente existe no filtro de meus grupos de pesquisa */}
      {/* <div className="flex gap-2">
        <Button variant={"tertiary"} className="size-12">
          <CustomIcon icon={HiOutlineAdjustmentsVertical} className="!size-6" />
        </Button>
        <Button variant={"tertiary"} className="h-12">
          Mais recentes
          <CustomIcon icon={PiSortAscending} className="!size-5" />
        </Button>
      </div> */}
    </div>
  );
};

export default MinhasDemandasFilter;
