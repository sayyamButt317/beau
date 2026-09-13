import { useQuery } from "@tanstack/react-query";
import { GetProductById, GetProducts } from "./routes";

export const useAdminGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: GetProducts,
    enabled: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60 * 1000,
    retry: false,
  });
};

export const useAdminGetProductById = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => GetProductById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60 * 1000,
    retry: false,
  });
};

