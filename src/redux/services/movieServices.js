import { fetchAPI } from "../../helper/fetcher";

export const getAllMovies = (req) =>
  fetchAPI({ type: "GET", url: "/discover/movie", params: req });
export const getDetailMovies = (req) =>
  fetchAPI({ type: "GET", url: "/movie/" + req.id });
export const getRecomendationsMovies = (req) =>
  fetchAPI({ type: "GET", url: "/movie/" + req.id + "/recommendations" });
export const getSimilarMovies = (req) =>
  fetchAPI({ type: "GET", url: "/movie/" + req.id + "/similar" });
export const getNowMovies = (req) =>
  fetchAPI({ type: "GET", url: "/movie/now_playing", params: req });
export const getTopRatedMovies = (req) =>
  fetchAPI({ type: "GET", url: "/movie/top_rated", params: req });
export const getUpcommingMovies = (req) =>
  fetchAPI({ type: "GET", url: "/movie/upcoming", params: req });

export const getUpSearchMovies = (req) =>
  fetchAPI({
    type: "GET",
    url: "/search/movie",
    params: { query: `${encodeURIComponent(req.query)}` },
  });
export const getGenreList = (req) =>
  fetchAPI({ type: "GET", url: "genre/movie/list" });
