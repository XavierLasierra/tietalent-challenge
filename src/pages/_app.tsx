import "@/styles/global.scss";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="wrapper">
      <main className="main">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
