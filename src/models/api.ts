import { Planet } from "./planets";

export interface RequestOptions {
  page?: number;
}

export interface GetPlanetsQuery extends RequestOptions {
  name?: string;
}

export interface GetPlanetsResponse {
  planets: Planet[];
  total: number;
}
