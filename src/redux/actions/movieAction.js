import * as actionType from "../types/movieTypes";
import * as api from "../services/movieServices";

export function loadContent(payload) {
  return (dispatch) => {
    return api.getAllMovies(payload).then((response) => {
      dispatch({
        type: actionType.GET_ALL_MOVIES,
        payload: response,
      });
      return Promise.resolve();
    });
  };
}

export function topRatedMovies(payload) {
  return (dispatch) => {
    return api.getTopRatedMovies(payload).then((response) => {
      dispatch({
        type: actionType.GET_TOP_RATED,
        payload: response,
      });
      return Promise.resolve();
    });
  };
}

export function commingMovies(payload) {
  return (dispatch) => {
    return api.getUpcommingMovies(payload).then((response) => {
      dispatch({
        type: actionType.GET_COMMING,
        payload: response,
      });
      return Promise.resolve();
    });
  };
}

export function getNowMovies(payload) {
  return (dispatch) => {
    return api.getNowMovies(payload).then((response) => {
      dispatch({
        type: actionType.GET_NOW_PLAYING,
        payload: response,
      });
      return Promise.resolve();
    });
  };
}
export function singleContent(payload) {
  return (dispatch) => {
    return api.getDetailMovies(payload).then((response) => {
      dispatch({
        type: actionType.GET_DETAIL_MOVIES,
        payload: response,
      });
      return Promise.resolve();
    });
  };
}

export function similarContent(payload) {
  return (dispatch) => {
    return api.getSimilarMovies(payload).then((response) => {
      dispatch({
        type: actionType.GET_SIMILAR_MOVIES,
        payload: response,
      });
      return Promise.resolve();
    });
  };
}
export function autocomplete(payload) {
  return (dispatch) => {
    return api.getUpSearchMovies(payload).then((response) => {
      dispatch({
        type: actionType.GET_AUTOCOMPLETE,
        payload: response,
      });
      return Promise.resolve();
    });
  };
}
export function searchContent(payload) {
  return (dispatch) => {
    return dispatch({
      type: actionType.GET_REQ_SEARCH,
      payload,
    });
  };
}

export function getGenre(payload) {
  return (dispatch) => {
    return api.getGenreList(payload).then((response) => {
      dispatch({
        type: actionType.GET_GENRE_MOVIES,
        payload: response,
      });
      return Promise.resolve();
    });
  };
}
