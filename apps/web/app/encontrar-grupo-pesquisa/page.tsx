"use client";

import { ResearchGroupList } from "@/components/ResearchGroupList";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiSearch } from "react-icons/fi";
import useGetAllResearchGroups from "@/api/research-group/use-get-all-research-group";
import { useEffect, useState } from "react";
import useSearchResearchGroup from "@/api/research-group/use-search-research-group";
import useGetAllKnowledgeAreas from "@/api/research-group/use-get-all-knowledgeAreas";

function EncontrarGrupoPesquisa() {
  const { data } = useGetAllResearchGroups();
  const { data: knowledgeAreas } = useGetAllKnowledgeAreas();
  const [researchgroups, setResearchgroups] = useState(data || []);
  const [search, setSearch] = useState("");
  const [areas, setAreas] = useState<{ id: string; name: string }[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setResearchgroups(data);
    }
  }, [data]);

  const { data: searchData } = useSearchResearchGroup(search, selectedAreas);

  useEffect(() => {
    if (searchData) {
      setResearchgroups(searchData);
    } else {
      setResearchgroups(data || []);
    }
  }, [searchData, data]);

  function handleSearch() {
    const searchValue = document.querySelector("input")?.value;
    setSearch(searchValue || "");
  }

  useEffect(() => {
    setAreas(knowledgeAreas || []);
  }, [knowledgeAreas]);

  function handleCheckboxChange(name: string, isChecked: boolean) {
    const newSelectedAreas = isChecked
      ? [...selectedAreas, name]
      : selectedAreas.filter((area) => area !== name);
    setSelectedAreas(newSelectedAreas);
  }

  return (
    <main className="max-w-screen-xl w-full px-8 mx-auto mb-auto grid md:grid-cols-[auto_1fr] md:grid-rows-[auto_auto_1fr] md:gap-3">
      <h1 className="font-semibold text-4xl mt-12 mb-8 md:col-span-2">
        Encontrar grupo de pesquisa
      </h1>

      <aside className="bg-white h-fit border py-8 px-6 rounded-2xl min-w-60 lg:min-w-80 hidden md:flex md:flex-col md:gap-5 row-span-2">
        <div>
          <Label className="font-semibold">Área</Label>
          <ul className="pr-4 flex gap-2 flex-col mt-2">
            {areas.map((area) => (
              <li key={area.id} className="flex items-center gap-1">
                <Checkbox
                  id={area.id}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(area.name, checked === true)
                  }
                />
                <Label htmlFor={area.id}>{area.name}</Label>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="flex gap-2 mb-4 md:mb-0">
        <Input
          className="bg-white h-12 rounded-lg"
          placeholder="Buscar grupo de pesquisa"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button className="h-12 rounded-lg" onClick={handleSearch}>
          <FiSearch />
          Pesquisar
        </Button>
      </div>

      <ResearchGroupList researchgroups={researchgroups} />
    </main>
  );
}

export default EncontrarGrupoPesquisa;
