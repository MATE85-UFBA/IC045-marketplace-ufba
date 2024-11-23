import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Demanda } from '@/modules/minhas-demandas/interfaces/demanda';

async function getMyDemands(): Promise<Demanda[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL).get<Demanda[]>(`/demand/my`)

  return data
}

export default function useGetMyDemands() {
  return useQuery({
    queryKey: ['demands'],
    queryFn: getMyDemands,
  })
}
