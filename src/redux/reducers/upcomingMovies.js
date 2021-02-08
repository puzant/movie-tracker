import { handleActions } from 'redux-actions';
import * as actions from '../actions/actionTypes'

export const initialState = {
  upcomingMovies: [],
  upcomingMoviesPending: false,
  upcomingMoviesError: false,
}

const fetchUpcomingMoviesPending = (state) => ({...state, upcomingMoviesPending: true, upcomingMoviesError: false})
const fetchUpcomingMoviesSuccess = (state, {payload}) => {
  return ({
    ...state,
    upcomingMovies: payload.upcomingMoveis,
    upcomingMoviesPending: false,
    upcomingMoviesError: false
  })
}
const fetchUpcomingMoviesError = (state) => ({...state, upcomingMoviesError: true, upcomingMoviesPending: false})

const upcomingMoviesActionHandler = {
  [actions.GET_UPCOMING_MOVIES_PENDING]: fetchUpcomingMoviesPending,
  [actions.GET_UPCOMING_MOVIES_SUCCESS]: fetchUpcomingMoviesSuccess,
  [actions.GET_UPCOMING_MOVIES_ERROR]: fetchUpcomingMoviesError
}

export default handleActions(upcomingMoviesActionHandler, initialState)