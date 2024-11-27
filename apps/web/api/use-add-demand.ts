import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { CreateDemand } from '@/types/demand';


async function addDemand(_data: CreateDemand) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, true).post(
    `/demand`,
    JSON.stringify(_data),
    { headers: { 'content-type': 'application/json' } },
  )

  return data
}

export default function useAddDemand(onSuccess: () => void, onError: () => void) {
  return useMutation({
    mutationFn: (data: CreateDemand) => addDemand( data),
    onSuccess,
    onError
  })
}
