import axios, { CreateAxiosDefaults } from "axios";
import {
  deleteUserFromLocalStorage,
  loadUserFromLocalStorage,
} from "./user.storage";

export const api = (apiUrl: string, auth = false) => {
  const user = loadUserFromLocalStorage();
  let headers: CreateAxiosDefaults["headers"] = {
    "content-type": "application/json",
  };

  if (auth) {
    headers = {
      ...headers,
      Authorization: `Bearer ${user.access_token}`,
    };
  }

  const axiosInstance = axios.create({
    baseURL: apiUrl,
    headers,
  });

  axiosInstance.interceptors.response.use((response) => {
    return response;
  }, whenError);
  return axiosInstance;
};

const whenError = (error: { response: { status: number } }) => {
  if (error.response.status === 401 || error.response.status === 403) {
    deleteUserFromLocalStorage();
    window.location.href = "/login";
  }
  return Promise.reject(error);
};
