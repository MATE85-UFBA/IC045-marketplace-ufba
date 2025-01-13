import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Demanda } from "@/modules/minhas-demandas/interfaces/demanda";

async function getOnePrivateDemand(id: string): Promise<Demanda> {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || "";

    const { data } = await api(apiURL, true).get<Demanda>(`/demand/private/${id}`);

    return data;
}

export default function useGetOnePrivateDemand(
    onSuccess: (data: Demanda) => void,
    onError: () => void
) {
    return useMutation({
        mutationFn: (id: string) => getOnePrivateDemand(id),
        onSuccess,
        onError,
    });
}
