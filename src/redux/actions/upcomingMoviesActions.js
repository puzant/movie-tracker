import { createAction } from 'redux-actions';
import upcomingMoviesActions from '../actionTypes/upcomingMoviesActionTypes'
import api from '../../api/api'

/*
 |--------------------------------------------------------------------------
 | Get Upcoming Movies
 |--------------------------------------------------------------------------
 */
const fetchUpcomingMoviesPending = createAction(upcomingMoviesActions.GET_UPCOMING_MOVIES_ACTIONS.PENDING)
const fetchUpcomingMoviesSuccess = createAction(upcomingMoviesActions.GET_UPCOMING_MOVIES_ACTIONS.SUCCESS, (upcomingMoveis) => ({upcomingMoveis}))
const fetchUpcomingMoviesError   = createAction(upcomingMoviesActions.GET_UPCOMING_MOVIES_ACTIONS.SUCCESS, (error) => ({error}))

const fetchUpcomingMovies = () => {
  return async dispatch => {
    try {
      dispatch(fetchUpcomingMoviesPending())
      const upcomingMoviesResponse = await api.getUpcomingMovies()
      dispatch(fetchUpcomingMoviesSuccess(upcomingMoviesResponse.data.results))
    } catch(error) {
      dispatch(fetchUpcomingMoviesError(error))
    }
  }
}

export default {
  fetchUpcomingMovies 
}