import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { GrupoPesquisa } from '@/modules/meus-grupos-pesquisa/interfaces/grupo-pesquisa';

async function getOneResearchGroup(id: string): Promise<GrupoPesquisa> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, false).get<GrupoPesquisa>(`/researchgroup/${id}`)

  return data
}

export default function useGetOneResearchGroup(id: string) {
  return useQuery({
    queryKey: ['one-research-groups',id],
    queryFn: () => getOneResearchGroup(id),
  })
}