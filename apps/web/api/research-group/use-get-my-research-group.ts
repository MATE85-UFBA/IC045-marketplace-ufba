import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { PesquisadorGrupo } from "@/modules/meus-grupos-pesquisa/interfaces/pesquisador-grupo";

async function getMyReseachGroup(search: string, order: string): Promise<PesquisadorGrupo> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

  const { data } = await api(apiURL, true).get<PesquisadorGrupo>(
    `/researcher/myresearchgroup?search=${search}&order=${order}`
  );

  return data;
}

export default function useGetMyResearchGroups(search: string, order: string) {
  return useQuery({
    queryKey: ["researchgroups", search, order],
    queryFn: () => getMyReseachGroup(search, order),
  });
}
