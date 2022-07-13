import React from "react";
import { GetStaticPropsContext } from "next";
import Head from "next/head";

import { getApiInstance } from "@/services/api";
import { Planet } from "@/models/planets";

import styles from "./Planet.module.scss";

interface PlanetProps {
  planet: Planet;
}

const Planet = ({ planet }: PlanetProps) => {
  const title = `Planet ${planet.name} - TieTalent challenge`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.planetName}>{planet.name}</h1>
      <ul className={styles.planetProperties}>
        {Object.entries(planet).map(([key, value]) => (
          <li key={key} className={styles.planetProperty}>
            <span className={styles.planetPropertyKey}>
              {key.toUpperCase()}:{" "}
            </span>
            {value}
          </li>
        ))}
      </ul>
    </>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const api = getApiInstance();
  let props = {};
  try {
    const { planetId } = context.params as { planetId: string };
    if (!planetId) throw new Error("No planet id found.");

    const planet = await api.getPlanetById(planetId);

    props = { planet };
  } catch (e) {
    //
  }
  return { props };
};

export const getStaticPaths = async () => {
  const api = getApiInstance();
  try {
    const { total: totalPlanets } = await api.getPlanets();
    const paths = new Array(totalPlanets).fill(0).map((_, i) => ({
      params: { planetId: `${i + 1}` },
    }));

    return { paths, fallback: false };
  } catch (e) {
    //
  }
};

export default Planet;
