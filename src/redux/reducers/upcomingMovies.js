import { handleActions } from 'redux-actions';
import { UPCOMING_MOVIES_ACTIONS } from '../actionTypes/upcomingMoviesActionTypes'

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
  [UPCOMING_MOVIES_ACTIONS.PENDING]: fetchUpcomingMoviesPending,
  [UPCOMING_MOVIES_ACTIONS.SUCCESS]: fetchUpcomingMoviesSuccess,
  [UPCOMING_MOVIES_ACTIONS.ERROR]: fetchUpcomingMoviesError
}

export default handleActions(upcomingMoviesActionHandler, initialState)