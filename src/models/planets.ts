import { getPlanetIdFromUrl } from "@/utils/getPlanetIdFromUrl";

export interface Planet {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
  created: string; // ISO 8601
  edited: string; // ISO 8601
  id: string;
}

export type DatabasePlanet = Omit<Planet, "id">;

export class Planet {
  constructor(databasePlanet: DatabasePlanet) {
    this.id = getPlanetIdFromUrl(databasePlanet.url);
    this.name = databasePlanet.name;
    this.diameter = databasePlanet.diameter;
    this.rotation_period = databasePlanet.rotation_period;
    this.orbital_period = databasePlanet.orbital_period;
    this.gravity = databasePlanet.gravity;
    this.population = databasePlanet.population;
    this.climate = databasePlanet.climate;
    this.terrain = databasePlanet.terrain;
    this.surface_water = databasePlanet.surface_water;
    this.residents = databasePlanet.residents;
    this.films = databasePlanet.films;
    this.url = databasePlanet.url;
    this.created = databasePlanet.created;
    this.edited = databasePlanet.edited;
  }
}
