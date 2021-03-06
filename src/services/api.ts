import axios, { AxiosInstance } from "axios";

import { appConfig } from "@/config/appConfig";
import { getPlanetIdFromUrl } from "@/utils/getPlanetIdFromUrl";
import { SWApiRoutes } from "@/routes/swApiRoutes";
import { GetPlanetsQuery, GetPlanetsResponse } from "@/models/api";
import { DatabasePlanet, Planet } from "@/models/planets";

interface SWApiInstance extends AxiosInstance {
  getPlanets: (requestOptions?: GetPlanetsQuery) => Promise<GetPlanetsResponse>;
  getPlanetById: (planetId: string) => Promise<Planet>;
}

let instance: SWApiInstance;

const getApiInstance = (baseURL = appConfig.baseURL): SWApiInstance => {
  if (instance) {
    return instance;
  }
  const api = axios.create({
    baseURL,
    headers: {
      "Cache-Control": "no-cache",
      Accept: "application/json; version=0",
      "Content-Type": "application/json",
    },
    timeout: 15000,
  }) as SWApiInstance;

  api.getPlanets = async (
    requestOptions?: GetPlanetsQuery
  ): Promise<GetPlanetsResponse> => {
    const { data } = await api.get(SWApiRoutes.planets, {
      params: {
        search: requestOptions?.name,
        page: requestOptions?.page,
      },
    });
    const planets: Planet[] = data?.results?.map(
      (planet: DatabasePlanet): Planet => ({
        ...new Planet(planet),
      })
    );

    return {
      planets,
      total: data?.count,
    };
  };

  api.getPlanetById = async (planetId: string): Promise<Planet> => {
    const { data } = await api.get(`${SWApiRoutes.planets}/${planetId}`);
    if (!data) throw new Error("Planet not found");

    const planet: Planet = { ...new Planet(data) };

    return planet;
  };

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // TODO better error handling
      console.log(error);
      return Promise.reject(error);
    }
  );

  instance = api;
  return instance;
};

export { getApiInstance };
