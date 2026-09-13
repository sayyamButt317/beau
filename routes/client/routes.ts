import { ClientEndpoint } from "./endpoint";
import axios, { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { getAuthCookieProvider } from "@/provider/AuthProvider";
import type { GetProductByIdResponse, GetProductsResponse } from "../../Types/Client/Product.Type";

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

export const GetProducts = async () => {
  const response = await api.get<GetProductsResponse>(
    ClientEndpoint.GET_PRODUCTS,
  );
  return response.data;
};

export const GetProductById = async (id: string) => {
    const response = await api.get<GetProductByIdResponse>(
      ClientEndpoint.GET_PRODUCT_BY_ID(id),
    );
    return response.data;
};
