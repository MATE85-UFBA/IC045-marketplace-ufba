import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomIcon } from "@/modules/components/icon/customIcon";

import { HiOutlineAdjustmentsVertical } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { PiSortAscending } from "react-icons/pi";

const MinhasDemandasFilter = () => {
  return (
    <div className="flex gap-2">
      <Input className="bg-white px-4 h-12 w-full" placeholder="Buscar" />
      <Button className="size-12">
        <CustomIcon icon={IoSearch} className="!size-6" />
      </Button>
      <Button variant={"tertiary"} className="size-12">
        <CustomIcon icon={HiOutlineAdjustmentsVertical} className="!size-6" />
      </Button>
      <Button variant={"tertiary"} className="h-12">
        Mais recentes
        <CustomIcon icon={PiSortAscending} className="!size-5" />
      </Button>
    </div>
  );
};

export default MinhasDemandasFilter