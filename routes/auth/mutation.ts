import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoginApi, RegisterApi } from "./routes";

export function LoginMutation() {
  return useMutation({
    mutationFn: () => LoginApi(),
    onSuccess: (_data,) => {
      toast.success("Login successfully");
    },
    onError: () => {
      toast.error("Failed to login");
    },
  });
}

export function RegisterMutation() {
    return useMutation({
      mutationFn: () => RegisterApi(),
      onSuccess: (_data,) => {
        toast.success("Register successfully");
      },
      onError: () => {
        toast.error("Failed to Register");
      },
    });
  }


