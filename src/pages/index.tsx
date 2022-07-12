import Head from "next/head";
import Image from "next/image";

import styles from "@/pages/index.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>TieTalent challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>Homepage works!</main>
    </>
  );
}
