import { createSelector } from "reselect";

const selectUpcomingMovies = (state: any) => state.upcomingMovies;

export const selectUpcomingMoives = createSelector(
  [selectUpcomingMovies],
  (movies) => movies.upcomingMovies
);
