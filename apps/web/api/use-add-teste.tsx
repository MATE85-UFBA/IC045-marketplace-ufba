import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { CreateDemand } from '@/types/demand';


async function addDemand(id:string, _data: CreateDemand) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, true).post(
    `/grupo-de-pesquisa/${id}`,
    JSON.stringify(_data),
  )

  return data
}

export default function useAddTeste(id:string, onSuccess: () => void, onError: () => void) {
  return useMutation({
    mutationFn: (data: CreateDemand) => addDemand(id, data),
    onSuccess,
    onError
  })
}