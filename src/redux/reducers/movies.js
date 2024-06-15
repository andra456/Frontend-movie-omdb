/* eslint-disable import/no-anonymous-default-export */
import * as actionType from "../types/movieTypes";
const initialState = {
  list_movie: null,
  detail_movie: null,
  autocomplete: null,
  similar_movie: [],
  genres_movie: [],
  upcomming: null,
  nowplaying: null,
  toprated: null,
  request: {
    y: "",
    s: "Batman",
    type: "",
    page: 1,
  },
};
//
export default function (state = initialState, action) {
  switch (action.type) {
    case actionType.GET_ALL_MOVIES:
      return { ...state, list_movie: action.payload };
    case actionType.GET_NOW_PLAYING:
      return { ...state, nowplaying: action.payload };
    case actionType.GET_TOP_RATED:
      return { ...state, toprated: action.payload };
    case actionType.GET_COMMING:
      return { ...state, upcomming: action.payload };
    case actionType.GET_DETAIL_MOVIES:
      return { ...state, detail_movie: action.payload };
    case actionType.GET_GENRE_MOVIES:
      return { ...state, genres_movie: action.payload.genres };
    case actionType.GET_SIMILAR_MOVIES:
      return {
        ...state,
        similar_movie: action.payload.results ? action.payload.results : [],
      };
    case actionType.GET_AUTOCOMPLETE:
      return { ...state, autocomplete: action.payload };
    default:
      return state;
  }
}
