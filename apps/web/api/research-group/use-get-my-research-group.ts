import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { PesquisadorGrupo } from '@/modules/meus-grupos-pesquisa/interfaces/pesquisador-grupo';


async function getMyReseachGroup(): Promise<PesquisadorGrupo> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, true).get<PesquisadorGrupo>(`/researcher/myresearchgroup`)

  return data
}

export default function useGetMyResearchGroups() {
  return useQuery({
    queryKey: ['researchgroups'],
    queryFn: getMyReseachGroup,
  })
}
