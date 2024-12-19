import { api } from "@/lib/axios";
import { Demanda } from "@/modules/minhas-demandas/interfaces/demanda";
import { useMutation } from "@tanstack/react-query";

async function getFilterDemands(query: string): Promise<Demanda[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

  const { data } = await api(apiURL, true).get<Demanda[]>(
    `/demand/suggest?query=${query}`
  );

  return data;
}

export default function useGetFilterDemands(
  onSuccess: (data: Demanda[]) => void,
  onError: () => void
) {
  return useMutation({
    mutationFn: (query: string) => getFilterDemands(query),
    onSuccess,
    onError,
  });
}
