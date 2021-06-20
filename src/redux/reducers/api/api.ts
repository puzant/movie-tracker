import { combineReducers } from "redux";

import { loadingReducer as loadingInitalState } from "./loading/loading";
import { errorReducer as errorInititalState } from "./error/error";
import { loadedReducer as loadedInitialState } from "./loaded/loaded";

export const initialState = {
  loading: loadingInitalState,
  error: errorInititalState,
  pending: loadedInitialState,
};

export default combineReducers({
  loading: loadingInitalState,
  error: errorInititalState,
  pending: loadedInitialState,
});
