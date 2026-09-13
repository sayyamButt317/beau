import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { CreateProductApi, DeleteProductApi, EditProductApi } from "./routes";
import type {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductBody,
  UpdateProductBody,
} from "@/Types/admin/product.type";

function errorMessage(error: unknown, fallback: string): string {
  if (isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; error?: string }
      | string
      | undefined;
    if (typeof data === "string" && data.trim()) return data;
    if (data && typeof data === "object") {
      if (data.message) return data.message;
      if (data.error) return data.error;
    }
    if (error.message) return error.message;
  }
  if (error instanceof Error) return error.message;
  return fallback;
}

export function CreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => CreateProductApi(data),
    onSuccess: (_data: CreateProductResponse) => {
      toast.success("Product created successfully");
      void queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error, "Failed to create product"));
    },
  });
}

export function EditProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProductBody) => EditProductApi(data),
    onSuccess: (_data: CreateProductResponse) => {
      toast.success("Product updated successfully");
      void queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error, "Failed to update product"));
    },
  });
}

export function DeleteProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: DeleteProductBody) => DeleteProductApi(body),
    onSuccess: () => {
      toast.success("Product deleted successfully");
      void queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      toast.error(errorMessage(error, "Failed to delete product"));
    },
  });
}
