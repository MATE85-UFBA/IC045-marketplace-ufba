import { api } from '@/lib/axios';

type Login = {email: string, password: string}

export async function login({email, password}: Login) {
  const { data, status } = await  api.post<{access_token: string}>('/login', {email, password})

  if(status === 200) {
    return data;
  }
}