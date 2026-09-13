import { AuthEndpoint } from "./endpoint";
import axios, { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { getAuthCookieProvider } from "@/provider/AuthProvider";
import { LoginApiRequest } from "@/Types/Auth/login.Type";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAuthCookieProvider();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error),
);



export const LoginApi = async() =>{
    const response = await api.post<LoginApiRequest>(AuthEndpoint.LOGIN);
    return response.data
}

export const RegisterApi = async() =>{
    const response = await api.post(AuthEndpoint.REGISTER);
    return response.data
}