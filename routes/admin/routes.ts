import { AdminEndpoint } from "./endpoint";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getAuthCookieProvider } from "@/provider/AuthProvider";
import type {
  GetProductByIdResponse,
  GetProductsResponse,
} from "../../Types/Client/Product.Type";
import type {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductBody,
  UpdateProductBody,
} from "@/Types/admin/product.type";

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
  const response = await api.get<GetProductsResponse>(AdminEndpoint.GET_PRODUCTS);
  return response.data;
};

export const GetProductById = async (id: string) => {
  const response = await api.get<GetProductByIdResponse>(
    AdminEndpoint.GET_PRODUCT_BY_ID(id),
  );
  return response.data;
};

export const CreateProductApi = async (product: CreateProductRequest) => {
  const response = await api.post<CreateProductResponse>(
    AdminEndpoint.CREATE_PRODUCT,
    product,
  );
  return response.data;
};

export const EditProductApi = async (product: UpdateProductBody) => {
  const response = await api.put<CreateProductResponse>(
    AdminEndpoint.EDIT_PRODUCT,
    product,
  );
  return response.data;
};

export const DeleteProductApi = async (body: DeleteProductBody) => {
  const response = await api.delete<CreateProductResponse>(
    AdminEndpoint.DELETE_PRODUCT,
    { data: body },
  );
  return response.data;
};
