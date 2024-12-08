import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { UserType } from '@/modules/painel-administrativo/types/user';

async function getAllUsers(): Promise<UserType[]> {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || ''

  const { data } = await api(apiURL, true).get<UserType[]>(`/admin/users`)

  return data
}

export default function useGetAllUsers() {
  return useQuery({
    queryKey: ['all-users'],
    queryFn: getAllUsers,
  })
}
