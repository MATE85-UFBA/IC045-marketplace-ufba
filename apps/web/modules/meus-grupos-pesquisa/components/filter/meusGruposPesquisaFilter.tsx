import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomIcon } from "@/modules/components/icon/customIcon";

import { IoSearch } from "react-icons/io5";

interface MeusGruposPesquisaFilterProps {
  handleSearch: () => void;
  setOrder: (value: "asc" | "desc") => void;
  order: "asc" | "desc";
}

const MeusGruposPesquisaFilter = ({
  handleSearch,
}: /*  setOrder,
  order, */
MeusGruposPesquisaFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex gap-2 w-full">
        <Input
          className="bg-white px-4 h-12"
          placeholder="Buscar"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button className="size-12" onClick={handleSearch}>
          <CustomIcon icon={IoSearch} className="!size-6" />
        </Button>
      </div>
      {/* <div className="flex gap-2  ">
        <Button variant={"tertiary"} className="size-12">
          <CustomIcon icon={HiOutlineAdjustmentsVertical} className="!size-6" />
        </Button>
        <Button variant={"tertiary"} className="h-12" onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
            {
              order == 'asc' ? "Mais recentes" : "Mais antigos"
            }
          <CustomIcon icon={PiSortAscending} className="!size-5" />
        </Button>
      </div> */}
    </div>
  );
};

export default MeusGruposPesquisaFilter;
