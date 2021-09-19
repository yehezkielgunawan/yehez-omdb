import axios, { AxiosResponse } from "axios";

import { API_KEY, BASE_URL } from "../../constants/config";
import { MovieList } from "./types";

export const getMovieList = async (keyword: string) => {
  return axios
    .get(`${BASE_URL}?apikey=${API_KEY}&s=${keyword}&page=2`)
    .then((res: AxiosResponse<MovieList>) => res.data);
};
