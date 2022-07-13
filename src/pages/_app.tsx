import Header from "@/common-components/header/Header";
import { AppRoutes } from "@/routes/appRoutes";
import "@/styles/global.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const addSearchQuery = (query: string) => {
    router.push(!!query ? `${AppRoutes.home}?name=${query}` : AppRoutes.home);
  };

  return (
    <div className="wrapper">
      <Header
        onSearch={addSearchQuery}
        initialSearchValue={router.query?.name as string}
      />
      <main className="main">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
