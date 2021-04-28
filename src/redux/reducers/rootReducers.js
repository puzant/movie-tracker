import { combineReducers } from 'redux'
import discoverMoviesReducer, { initialState as discoverInitialState } from './discoverMovies'
import movieReducer, { initialState as movieInitialState } from './movie'
import searchReducer, { initialState as searchInitialState } from './search'
import authReducer, { initialState as authInitialReducer } from './auth'
import upcomingMoviesReducer, { initialState as upcomingInitialState } from './upcomingMovies'

export const initialState = {
  discover: discoverInitialState,
  upcoming: upcomingInitialState,
  search: searchInitialState,
  movie: movieInitialState,
  login: authInitialReducer,
}

export default combineReducers({
  discover: discoverMoviesReducer,
  upcoming: upcomingMoviesReducer,
  search: searchReducer,
  movie: movieReducer,
  auth: authReducer,
})