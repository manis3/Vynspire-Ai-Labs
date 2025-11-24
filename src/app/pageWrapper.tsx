"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-full max-h-screen overflow-scroll scrollbar-none bg-background text-text-Primary font-roboto">
        {children}
      </div>
    </QueryClientProvider>
  );
}
