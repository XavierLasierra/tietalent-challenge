import React, { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import TtButton from "@/components/ttButton/TtButton";
import TtCard from "@/components/ttCard/TtCard";

import { getApiInstance } from "@/services/api";
import { Planet } from "@/models/planets";
import { GetPlanetsQuery } from "@/models/api";
import { AppRoutes } from "@/routes/appRoutes";

import styles from "@/pages/index.module.scss";
import TtRadarChart, {
  TTRadarChartDataset,
} from "@/components/ttRadarChart/TtRadarChart";

interface HomeProps {
  planets: Planet[];
  totalPlanets: number;
  currentPage: number;
}

export default function Home({
  planets = [],
  totalPlanets,
  currentPage,
}: HomeProps) {
  const router = useRouter();
  const [selectedPlanets, setSelectedPlanets] = useState<Planet[]>([]);

  const wantedStats: string[] = [
    "Rotation period (days)",
    "Orbital period (*100days)",
    "Diameter (*1000km)",
    "Gravity (g)",
    "Surface water (%)",
    "population (*1,000,000 habitants)",
  ];
  const chartData: TTRadarChartDataset[] = selectedPlanets.map((planet) => ({
    label: planet.name,
    data: [
      +planet.rotation_period,
      +planet.orbital_period,
      +planet.diameter / 1000,
      +planet.gravity.split(" ")[0],
      +planet.surface_water,
      +planet.population / 1000000,
    ],
  }));

  const navigateToPlanetsPage = (pageNumber: number) => {
    router.push({
      pathname: AppRoutes.home,
      query: { ...router.query, page: pageNumber },
    });
  };

  const onSelect = (planet: Planet) => {
    if (selectedPlanets.includes(planet)) {
      setSelectedPlanets(selectedPlanets.filter((p) => p.id !== planet.id));
    } else {
      setSelectedPlanets([...selectedPlanets, planet]);
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
        <div className={styles.planetsChart}>
          <TtRadarChart
            title="Selected planets comparison"
            labels={wantedStats}
            datasets={chartData}
            emptyText="No planets selected"
          />
        </div>
        <section className={styles.planetsSection}>
          <ul className={styles.planets}>
            {planets.map((planet) => (
              <li className={styles.planetContainer} key={planet.id}>
                <TtCard highlighted={isPlanetSelected(planet.id)}>
                  <div className={styles.planet}>
                    <h2 className={styles.planetName}>{planet.name}</h2>
                    <div className={styles.planetContent}>
                      <TtButton
                        text={
                          isPlanetSelected(planet.id) ? "Unselect" : "Select"
                        }
                        onClick={() => onSelect(planet)}
                      />
                      <Link href={`${AppRoutes.planets}/${planet.id}`} passHref>
                        <TtButton text="See detail" type="secondary" />
                      </Link>
                    </div>
                  </div>
                </TtCard>
              </li>
            ))}
          </ul>
          <nav className={styles.planetNavigationButtons}>
            <div>
              {currentPage > 1 && (
                <TtButton
                  text="Previous"
                  onClick={() => navigateToPlanetsPage(+currentPage - 1)}
                />
              )}
            </div>
            <div>
              {currentPage * planets.length < totalPlanets && (
                <TtButton
                  text="Next"
                  onClick={() => navigateToPlanetsPage(+currentPage + 1)}
                />
              )}
            </div>
          </nav>
        </section>
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
