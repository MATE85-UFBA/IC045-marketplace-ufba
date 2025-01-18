import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';

type SendEmail = {
    message: string;
    research_group: string;
    companyId: string;
}

async function sendMail(_data: SendEmail) {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, true).post(
    `/company/send-email`,
    JSON.stringify(_data),
    { headers: { 'content-type': 'application/json' } },
  )

  return data
}

export default function useSendMail(onSuccess: () => void, onError: () => void) {
  return useMutation({
    mutationFn: (data: SendEmail) => sendMail( data),
    onSuccess,
    onError
  })
}
