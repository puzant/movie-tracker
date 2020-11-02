import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from "./reducers/reducers";
import thunk from "redux-thunk";

const middlewares = [thunk];
const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(...middlewares)
))

export default store