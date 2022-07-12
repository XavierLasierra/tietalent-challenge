import axios, { AxiosInstance } from "axios";
import { appConfig } from "@/config/appConfig";
import { SWApiRoutes } from "./swApiRoutes";
import { GetPlanetsQuery, GetPlanetsResponse } from "@/models/api";

interface SWApiInstance extends AxiosInstance {
  getPlanets: (requestOptions?: GetPlanetsQuery) => Promise<GetPlanetsResponse>;
}

let instance: SWApiInstance;

const getApiInstance = (baseURL = appConfig.baseURL): SWApiInstance => {
  if (instance) {
    return instance;
  }
  console.log(baseURL);
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

    return {
      planets: data.results,
      total: data.count,
    };
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
