import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

async function addKeyword(name: string) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, true).post(
    `/keywords`,
    JSON.stringify({ name }),
    { headers: { 'content-type': 'application/json' } },
  )

  return data
}

export default function useAddKeyword(onSuccess: () => void, onError: () => void) {
  return useMutation({
    mutationFn: (name: string) => addKeyword(name),
    onSuccess,
    onError
  })
}
