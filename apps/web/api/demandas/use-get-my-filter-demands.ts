import { api } from "@/lib/axios";
import { Demanda } from "@/modules/minhas-demandas/interfaces/demanda";
import { useMutation } from "@tanstack/react-query";

async function getMyFilterDemands(query: string): Promise<Demanda[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

  const { data } = await api(apiURL, true).get<Demanda[]>(
    `/demand/suggest-filter?query=${query}`
  );

  return data;
}

export default function useGetMyFilterDemands(
  onSuccess: (data: Demanda[]) => void,
  onError: () => void
) {
  return useMutation({
    mutationFn: (query: string) => getMyFilterDemands(query),
    onSuccess,
    onError,
  });
}
