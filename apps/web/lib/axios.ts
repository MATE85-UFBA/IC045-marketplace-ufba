import axios from 'axios';

export const api = (apiUrl: string) => {
  return axios.create({
    baseURL: apiUrl,
  })
}
