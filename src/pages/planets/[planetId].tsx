import React from "react";

import { getApiInstance } from "@/services/api";
import { GetStaticPropsContext } from "next";
import { Planet } from "@/models/planets";
import Head from "next/head";

interface PlanetProps {
  planet: Planet;
}

const Planet = ({ planet }: PlanetProps) => {
  return (
    <>
      <Head>
        <title>Planet {planet.name} - TieTalent challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{planet.name}</h1>
      {Object.entries(planet).map(([key, value]) => (
        <p key={key}>{`${key}: ${value}`}</p>
      ))}
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
