import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';


async function getAllKnowledgeAreas(): Promise<{id: string, name: string}[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, false).get<{id: string, name: string}[]>(`/researchgroup/knowledgearea/all`)

  return data
}

export default function useGetAllKnowledgeAreas() {
  return useQuery({
    queryKey: ['all-knowledge-areas'],
    queryFn: getAllKnowledgeAreas,
  })
}