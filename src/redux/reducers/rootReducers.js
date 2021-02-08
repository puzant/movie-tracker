import { combineReducers } from 'redux'
import discoverMoviesReducer, { initialState as discoverInitialState } from './discoverMovies'
import movieReducer, { initialState as movieInitialState } from './movie'
import searchReducer, { initialState as searchInitialState } from './search'
import loginReducer, { initialState as loginInitialReducer } from './login'
import upcomingMoviesReducer, { initialState as upcomingInitialState } from './upcomingMovies'

export const initialState = {
  discover: discoverInitialState,
  upcoming: upcomingInitialState,
  search: searchInitialState,
  movie: movieInitialState,
  login: loginInitialReducer,
}

export default combineReducers({
  discover: discoverMoviesReducer,
  upcoming: upcomingMoviesReducer,
  search: searchReducer,
  movie: movieReducer,
  login: loginReducer,
})