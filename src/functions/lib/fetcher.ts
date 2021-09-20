import axios, { AxiosResponse } from "axios";

import { BASE_URL } from "../../constants/config";
import { MovieList, SingleMovieDetail } from "./types";

export const getMovieRes = async (
  keyword: string,
  API_KEY: string,
  page?: number,
) => {
  return axios
    .get(
      `${BASE_URL}?apikey=${API_KEY}&s=${keyword}${
        page ? `&page=${page}` : ""
      }`,
    )
    .then((res: AxiosResponse<MovieList>) => res.data);
};

export const getMovieDetails = async (imdbID: string, API_KEY: string) => {
  return axios
    .get(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`)
    .then((res: AxiosResponse<SingleMovieDetail>) => res.data);
};
