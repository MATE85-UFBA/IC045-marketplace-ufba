import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { TResearchGroup } from "@/modules/detalhe-grupo-pesquisa/types/researchgroup.type";

async function getResearchGroup(groupId: string): Promise<TResearchGroup> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

  const { data } = await api(apiURL, false).get<TResearchGroup>(
    `/researchgroup/${groupId}?members=true&projects=true`
  );

  return data;
}

export default function useGetResearchGroup(groupId: string) {
  return useQuery({
    queryKey: ["researchGroup", groupId],
    queryFn: () => getResearchGroup(groupId),
    enabled: !!groupId,
  });
}
