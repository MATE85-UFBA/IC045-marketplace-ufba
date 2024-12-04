import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Demanda } from '@/modules/minhas-demandas/interfaces/demanda';

async function getMyDemands(ctx): Promise<Demanda[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, true).get<Demanda[]>(`/demand/${id}`)

  return data
}

export default function useGetMyDemands(id: string) {
  return useQuery({
    queryKey: ['demands', id],
    queryFn: getMyDemands,
  })
}
