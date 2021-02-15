import { createAction } from 'redux-actions';
import * as actions from './actionTypes'
import api from '../../api/api'

/*
 |--------------------------------------------------------------------------
 | Get Upcoming Movies
 |--------------------------------------------------------------------------
 */
const fetchUpcomingMoviesPending = createAction(actions.GET_UPCOMING_MOVIES_PENDING)
const fetchUpcomingMoviesSuccess = createAction(actions.GET_UPCOMING_MOVIES_SUCCESS, (upcomingMoveis) => ({upcomingMoveis}))
const fetchUpcomingMoviesError   = createAction(actions.GET_UPCOMING_MOVIES_ERROR, (error) => ({error}))

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