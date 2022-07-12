import Head from "next/head";

import styles from "@/pages/index.module.scss";
import { Planet } from "@/models/planets";
import { getApiInstance } from "@/services/api";
import { GetServerSidePropsContext } from "next";
import { GetPlanetsQuery } from "@/models/api";

interface HomeProps {
  planets: Planet[];
  totalPlanets: number;
}

export default function Home({ planets = [], totalPlanets = 0 }: HomeProps) {
  return (
    <>
      <Head>
        <title>TieTalent challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>{JSON.stringify(planets)}</main>
    </>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const api = getApiInstance();
  try {
    const { name, page } = query as GetPlanetsQuery;
    const { planets, total: totalPlanets } = await api.getPlanets({
      name,
      page,
    });

    return {
      props: {
        planets,
        totalPlanets,
      } as HomeProps,
    };
  } catch (e) {
    //
  }
}
