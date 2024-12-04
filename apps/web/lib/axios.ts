import axios, { CreateAxiosDefaults } from 'axios';
import { loadUserFromLocalStorage } from '@/app/service/auth.storage';

export const api = (apiUrl: string, auth = false) => {
const user = loadUserFromLocalStorage()
  let headers: CreateAxiosDefaults['headers'] = {'content-type': 'application/json'}

  if(auth) {
    headers = {
      ...headers,
      Authorization: `Bearer ${user.access_token}`
    }
  }

  return axios.create({
    baseURL: apiUrl,
    headers
  })
}
