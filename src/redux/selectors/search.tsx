import { createSelector } from "reselect";

const selectMoviesSearch = (state: any) => state.search;

export const getSearchResults = createSelector(
  [selectMoviesSearch],
  (movie) => movie.searchResults
);
export const getPendingSearch = createSelector(
  [selectMoviesSearch],
  (movie) => movie.pending
);
export const getErrorSearch = createSelector(
  [selectMoviesSearch],
  (movie) => movie.error
);
export const getEmptySearch = createSelector(
  [selectMoviesSearch],
  (movie) => movie.empty
);
