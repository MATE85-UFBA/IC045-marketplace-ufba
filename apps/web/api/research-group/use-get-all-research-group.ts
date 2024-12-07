import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { GrupoPesquisa } from '@/modules/meus-grupos-pesquisa/interfaces/grupo-pesquisa';

async function getAllResearchGroups(): Promise<GrupoPesquisa[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, true).get<GrupoPesquisa[]>(`/researchgroup/all`)

  return data
}

export default function useGetAllResearchGroups() {
  return useQuery({
    queryKey: ['all-research-groups'],
    queryFn: getAllResearchGroups,
  })
}