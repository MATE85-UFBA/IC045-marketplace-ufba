import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';


async function deleteDemand(demandId: string) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, true).delete(
    `/demand/${demandId}`,
    { headers: { 'content-type': 'application/json' } },
  )

  return data
}

export default function useDeleteDemand(onSuccess: () => void, onError: () => void) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (demandId: string) => deleteDemand(demandId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['demands']});
      onSuccess()
    },
    onError
  })
}