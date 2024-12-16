"use client";

import { DemandList } from "@/components/DemandList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiSearch } from "react-icons/fi";
import useGetAllDemands from "@/api/demandas/use-get-all-demands";
import { useState } from "react";
import { Demanda } from "@/modules/minhas-demandas/interfaces/demanda";
import useGetFilterDemands from "@/api/demandas/use-get-filter-demands";
import { toast } from "@/hooks/use-toast";

function EncontrarDemandas() {
  const { data: demands = [] } = useGetAllDemands();
  const [filter, setFilter] = useState<string>("");
  const [filteredDemands, setFilteredDemands] = useState<Demanda[]>();

  const filterDemands = useGetFilterDemands(
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
    <main className="max-w-screen-xl w-full px-8 mx-auto mb-auto grid md:grid-cols-[auto_1fr] md:grid-rows-[auto_auto_1fr] md:gap-3">
      <h1 className="font-semibold text-4xl mt-12 mb-8 md:col-span-2">
        Encontrar demandas
      </h1>

      <aside className="bg-white h-fit border py-4 px-5 rounded-2xl min-w-60 lg:min-w-80 hidden md:flex md:flex-col md:gap-5 row-span-2">
        <div>
          <Label className="font-semibold">Área</Label>

          <ul className="pr-4 flex gap-2 flex-col mt-2">
            <li className="flex items-center gap-1">
              <Checkbox id="exatas" />
              <Label htmlFor="exatas">Ciências Exatas e da Terra</Label>
            </li>

            <li className="flex items-center gap-1">
              <Checkbox id="biologicas" />
              <Label htmlFor="biologicas">Ciências Biológicas</Label>
            </li>

            <li className="flex items-center gap-1">
              <Checkbox id="engenharia" />
              <Label htmlFor="engenharia">Engenharia / Tecnologia</Label>
            </li>

            <li className="flex items-center gap-1">
              <Checkbox id="saude" />
              <Label htmlFor="saude">Ciências da Saúde</Label>
            </li>

            <li className="flex items-center gap-1">
              <Checkbox id="agrarias" />
              <Label htmlFor="saude">Ciências Agrárias</Label>
            </li>

            <li className="flex items-center gap-1">
              <Checkbox id="sociais" />
              <Label htmlFor="saude">Ciências Sociais</Label>
            </li>

            <li className="flex items-center gap-1">
              <Checkbox id="humanas" />
              <Label htmlFor="saude">Ciências Humanas</Label>
            </li>

            <li className="flex items-center gap-1">
              <Checkbox id="letras" />
              <Label htmlFor="saude">Linguística, Letras e Artes</Label>
            </li>
          </ul>
        </div>

        <div>
          <Label htmlFor="publishedDate" className="font-semibold">
            Data de publicação
          </Label>
          <Select>
            <SelectTrigger id="publishedDate" className="bg-white h-auto mt-2">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Hoje</SelectItem>
              <SelectItem value="2">Esta semana</SelectItem>
              <SelectItem value="3">Últimas 2 semanas</SelectItem>
              <SelectItem value="4">Este mês</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </aside>

      <div className="flex gap-2">
        <Input
          className="bg-white h-12 rounded-lg"
          onBlur={(e) => setFilter(e.target.value)}
          placeholder="Buscar demanda"
        />
        <Button onClick={handleFilter} className="h-12 rounded-lg">
          <FiSearch />
        </Button>
      </div>

      <DemandList
        demands={filteredDemands && filter !== "" ? filteredDemands : demands}
      />
    </main>
  );
}

export default EncontrarDemandas;
