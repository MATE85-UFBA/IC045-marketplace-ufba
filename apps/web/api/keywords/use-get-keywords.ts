import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Keyword } from '@/modules/minhas-demandas/interfaces/demanda';

async function getKeywords(): Promise<Keyword[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, true).get<Keyword[]>(`/keywords`)

  return data
}

export default function useGetKeywords() {
  return useQuery({
    queryKey: ['keywords'],
    queryFn: getKeywords,
  })
}
