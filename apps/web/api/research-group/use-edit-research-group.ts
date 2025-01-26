import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { EditResearchGroup } from '@/components/MyResearchGroupList/type';


async function editResearchGroup(_data: EditResearchGroup, id: string) {
    const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

    const { data } = await api(apiURL, true).put(
        `/researchgroup/${id}`,
        JSON.stringify(_data),
        { headers: { 'content-type': 'application/json' } },
    )

    return data
}

export default function useEditResearchGroup(onSuccess: () => void, onError: () => void, id: string) {
    return useMutation({
        mutationFn: (data: EditResearchGroup) => editResearchGroup(data, id),
        onSuccess,
        onError
    })
}
