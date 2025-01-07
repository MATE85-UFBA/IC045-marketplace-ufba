import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Demanda } from "@/modules/minhas-demandas/interfaces/demanda";

async function getOneDemand(id: string): Promise<Demanda> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

  const { data } = await api(apiURL, true).get<Demanda>(`/demand/${id}`);

  return data;
}

export default function useGetOneDemand(
  onSuccess: (data: Demanda) => void,
  onError: () => void
) {
  return useMutation({
    mutationFn: (id: string) => getOneDemand(id),
    onSuccess,
    onError,
  });
}
