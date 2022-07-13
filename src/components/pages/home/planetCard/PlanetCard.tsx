import React from "react";
import Link from "next/link";

import TtCard from "@/common-components/ttCard/TtCard";
import TtButton from "@/common-components/ttButton/TtButton";

import { AppRoutes } from "@/routes/appRoutes";
import { Planet } from "@/models/planets";

import styles from "./PlanetCard.module.scss";

interface PlanetCardProps {
  planet: Planet;
  selected?: boolean;
  onSelect: (planet: Planet) => void;
}

const PlanetCard = ({
  planet,
  selected = false,
  onSelect,
}: PlanetCardProps) => {
  return (
    <TtCard highlighted={selected}>
      <div className={styles.planet}>
        <h2 className={styles.planetName}>{planet.name}</h2>
        <div className={styles.planetContent}>
          <TtButton
            text={selected ? "Unselect" : "Select"}
            onClick={() => onSelect(planet)}
          />
          <Link href={`${AppRoutes.planets}/${planet.id}`} passHref>
            <TtButton text="See detail" type="secondary" />
          </Link>
        </div>
      </div>
    </TtCard>
  );
};

export default PlanetCard;
