import { applyMiddleware, createStore } from "redux";
import reducers from "./reducers/reducers";
import thunk from "redux-thunk";

const middlewares = [thunk];
const store = createStore(reducers, applyMiddleware(...middlewares))

export default store