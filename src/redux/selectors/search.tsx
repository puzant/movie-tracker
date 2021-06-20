import { createSelector } from "reselect";

const selectMoviesSearch = (state: any) => state.search;

export const selectSearchResults = createSelector(
  [selectMoviesSearch],
  (search) => search.searchResults
);
export const selectPendingSearch = createSelector(
  [selectMoviesSearch],
  (search) => search.pending
);
export const selectErrorSearch = createSelector(
  [selectMoviesSearch],
  (search) => search.error
);
export const selectEmptySearch = createSelector(
  [selectMoviesSearch],
  (search) => search.empty
);
