import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducers from './reducers/rootReducers'
import thunk from "redux-thunk";

const middlewares = [thunk];
const store = createStore(rootReducers, composeWithDevTools(
  applyMiddleware(...middlewares)
))

export default store