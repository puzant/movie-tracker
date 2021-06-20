import { handleActions } from "redux-actions";
import { UPCOMING_MOVIES_ACTIONS } from "../actionTypes/upcomingMoviesActionTypes";

export const initialState = {
  upcomingMovies: [],
  pending: false,
  error: false,
};

const fetchUpcomingMoviesPending = (state) => ({
  ...state,
  pending: true,
  error: false,
});
const fetchUpcomingMoviesSuccess = (state, { payload }) => {
  return {
    ...state,
    upcomingMovies: payload.upcomingMovies,
    pending: false,
    error: false,
  };
};
const fetchUpcomingMoviesError = (state) => ({
  ...state,
  error: true,
  pending: false,
});

const upcomingMoviesActionHandler = {
  [UPCOMING_MOVIES_ACTIONS.PENDING]: fetchUpcomingMoviesPending,
  [UPCOMING_MOVIES_ACTIONS.SUCCESS]: fetchUpcomingMoviesSuccess,
  [UPCOMING_MOVIES_ACTIONS.ERROR]: fetchUpcomingMoviesError,
};

export default handleActions(upcomingMoviesActionHandler, initialState);
