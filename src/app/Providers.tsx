"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "jotai";
import { CheckCircle2 } from "lucide-react";
import type { PropsWithChildren } from "react";
import { useState } from "react";
import { Toaster } from "sonner";

export const Providers = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Пример: данные "свежие" 1 минуту
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>{children}</Provider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-center"
        closeButton
        icons={{
          success: <CheckCircle2 className="size-5 text-emerald-500" />,
        }}
        toastOptions={{
          duration: 3500,
          classNames: {
            toast:
              "group !w-[min(420px,calc(100vw-32px))] !rounded-2xl !border !border-blue-100 !bg-white !px-4 !py-3 !shadow-[0_12px_35px_rgba(2,91,255,0.16)]",
            title: "!text-sm !font-semibold !text-gray-900",
            description: "!mt-1 !text-xs !text-gray-500",
            success: "!border-emerald-100",
            closeButton:
              "!left-auto !right-2 !top-2 !border-0 !bg-transparent !text-gray-400 hover:!text-gray-700",
          },
        }}
      />
    </QueryClientProvider>
  );
};
