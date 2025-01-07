import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Demanda } from '@/modules/minhas-demandas/interfaces/demanda';

async function getAllDemands(): Promise<Demanda[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, false).get<Demanda[]>(`/demand/all`)

  return data
}

export default function useGetAllDemands() {
  return useQuery({
    queryKey: ['all-demands'],
    queryFn: getAllDemands,
  })
}
