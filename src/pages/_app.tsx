import Providers from "@/components/Providers";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { appWithTranslation } from "next-i18next";

export const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Providers>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Providers>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App);
