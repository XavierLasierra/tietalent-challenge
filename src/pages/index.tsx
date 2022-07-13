import React, { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";

import TtRadarChart, {
  TTRadarChartDataset,
} from "@/common-components/ttRadarChart/TtRadarChart";
import PlanetCard from "@/components/home/planetCard/PlanetCard";
import PagesNavigation from "@/components/home/pagesNavigation/PagesNavigation";

import { getApiInstance } from "@/services/api";
import { Planet } from "@/models/planets";
import { GetPlanetsQuery } from "@/models/api";
import { AppRoutes } from "@/routes/appRoutes";

import styles from "@/pages/index.module.scss";

interface HomeProps {
  planets: Planet[];
  totalPlanets: number;
  currentPage: number;
}

const STATS_LABELS: string[] = [
  "Rotation period (days)",
  "Orbital period (*100days)",
  "Diameter (*1000km)",
  "Gravity (g)",
  "Surface water (%)",
  "population (*1,000,000 habitants)",
];

interface SelectedPlanetState {
  planetData: TTRadarChartDataset;
  id: string;
}

export default function Home({
  planets = [],
  totalPlanets,
  currentPage,
}: HomeProps) {
  const router = useRouter();
  const [selectedPlanets, setSelectedPlanets] = useState<SelectedPlanetState[]>(
    []
  );

  const navigateToPlanetsPage = (pageNumber: number) => {
    router.push({
      pathname: AppRoutes.home,
      query: { ...router.query, page: pageNumber },
    });
  };

  const transformPlanetData = (planet: Planet): SelectedPlanetState => ({
    id: planet.id,
    planetData: {
      label: planet.name,
      data: [
        +planet.rotation_period,
        +planet.orbital_period,
        +planet.diameter / 1000,
        +planet.gravity.split(" ")[0],
        +planet.surface_water,
        +planet.population / 1000000,
      ],
    },
  });

  const onSelectPlanet = (planet: Planet) => {
    if (isPlanetSelected(planet.id)) {
      setSelectedPlanets(
        selectedPlanets.filter(
          ({ id }: SelectedPlanetState) => id !== planet.id
        )
      );
    } else {
      setSelectedPlanets([...selectedPlanets, transformPlanetData(planet)]);
    }
  };

  const isPlanetSelected = (planetId: string) =>
    selectedPlanets.some((planet) => planet.id === planetId);

  return (
    <>
      <Head>
        <title>Planets comparator - TieTalent challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.planetsTitle}>Planets comparator</h1>
      <div className={styles.container}>
        {planets.length > 0 ? (
          <>
            <section className={styles.planetsChart}>
              <TtRadarChart
                title="Selected planets comparison"
                labels={STATS_LABELS}
                datasets={selectedPlanets.map((planet) => planet.planetData)}
                emptyText="No planets selected"
              />
            </section>
            <section className={styles.planetsSection}>
              <ul className={styles.planets}>
                {planets.map((planet) => (
                  <li className={styles.planetContainer} key={planet.id}>
                    <PlanetCard
                      planet={planet}
                      selected={isPlanetSelected(planet.id)}
                      onSelect={onSelectPlanet}
                    />
                  </li>
                ))}
              </ul>
              <PagesNavigation
                onPageSelect={navigateToPlanetsPage}
                currentPage={+currentPage}
                totalCount={+totalPlanets}
                pageCount={planets.length}
              />
            </section>
          </>
        ) : (
          <p className={styles.emptyList}>No planets found</p>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  const api = getApiInstance();
  let props = {};
  try {
    const { name, page } = query as GetPlanetsQuery;
    const { planets, total: totalPlanets } = await api.getPlanets({
      name,
      page,
    });

    props = {
      planets: planets || [],
      totalPlanets: totalPlanets || 0,
      currentPage: page || 1,
    } as HomeProps;
  } catch (e) {
    //
  }
  return { props };
}
