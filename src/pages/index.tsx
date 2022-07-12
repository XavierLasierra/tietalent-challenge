import React from "react";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import Head from "next/head";

import TtButton from "@/components/ttButton/TtButton";
import TtCard from "@/components/ttCard/TtCard";

import { getApiInstance } from "@/services/api";
import { Planet } from "@/models/planets";
import { GetPlanetsQuery } from "@/models/api";
import { AppRoutes } from "@/routes/appRoutes";

import styles from "@/pages/index.module.scss";

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
      <h1>Planets explorer</h1>
      <ul className={styles.planets}>
        {planets.map((planet) => (
          <li className={styles.planetContainer} key={planet.id}>
            <TtCard>
              <div className={styles.planet}>
                <h2>{planet.name}</h2>
                <div className={styles.planetContent}>
                  <section>
                    <p>
                      <span>Rotation period:</span> {planet.rotation_period}{" "}
                      days
                    </p>
                    <p>
                      <span>Orbital period:</span> {planet.orbital_period} days
                    </p>
                    <p>
                      <span>Diameter:</span> {planet.diameter}m
                    </p>
                    <p>
                      <span>Gravity:</span> {planet.gravity} m/s2
                    </p>
                    <p>
                      <span>Surface Water:</span> {planet.surface_water}l
                    </p>
                    <p>
                      <span>Population:</span> {planet.population}
                    </p>
                  </section>
                  <Link href={`${AppRoutes.planets}/${planet.id}`} passHref>
                    <TtButton text="See detail" />
                  </Link>
                </div>
              </div>
            </TtCard>
          </li>
        ))}
      </ul>
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
