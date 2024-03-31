import AppLayout from "@/components/AppLayout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";

export const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </AppLayout>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
