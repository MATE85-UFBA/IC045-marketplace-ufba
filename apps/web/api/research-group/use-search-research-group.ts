import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { GrupoPesquisa } from '@/modules/meus-grupos-pesquisa/interfaces/grupo-pesquisa';

async function searchResearchGroup(query: string, area: string[]): Promise<GrupoPesquisa[]> {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

    const { data } = await api(apiURL, false).post<GrupoPesquisa[]>(`/researchgroup/search?data=${query}&area=${area.join('/')}`);

    return data
}

export default function useSearchResearchGroup(query: string, area: string[]) {
    return useQuery({
        queryKey: ['search-research-group', query, area],
        queryFn: () => searchResearchGroup(query, area),
    })
}