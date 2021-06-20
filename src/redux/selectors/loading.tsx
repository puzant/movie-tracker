import { createSelector } from "reselect";
import apiSelectors from "./api";

const selectLoading = createSelector(
  [apiSelectors.selectApi],
  (api) => api.loading
);

const createIsLoadingSelector = (actions: any) =>
  createSelector([selectLoading], (loadingState) =>
    actions.some((action: any) => loadingState[action])
  );

export default {
  createIsLoadingSelector,
};
