import axios from 'axios';
import { loadUserFromLocalStorage } from '@/app/store/login';

export const api = (apiUrl: string, auth = false) => {
const user = loadUserFromLocalStorage()
  let headers = {'content-type': 'application/json'}

  if(auth) {
    headers = {
      ...headers,
      Authentication: `Bearer ${user.access_token}`,
    }
  }

  return axios.create({
    baseURL: apiUrl,
    headers
  })
}
