import { createSelector } from "reselect";

const selectUpcomingMovies = (state: any) => state.upcoming;

export const selectUpcomingMoives = createSelector(
  [selectUpcomingMovies],
  (upcomingMovies) => upcomingMovies.data
);
