"use client";

import { type ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "@/errors/ErrorBoundary";
import { Toaster } from "@/components/ui/sonner";

type QueryProviderProps = {
  children: ReactNode;
};

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        },
      },
    });
  }

  if (!browserQueryClient) {
    browserQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        },
      },
    });
  }

  return browserQueryClient;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>{children}</ErrorBoundary>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
