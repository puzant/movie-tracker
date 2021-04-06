import { createAction } from 'redux-actions';
import { UPCOMING_MOVIES_ACTIONS } from '../actionTypes/upcomingMoviesActionTypes'
import api from '../../api/api'
import { IMovie } from '../../api/Models'

/*
 |--------------------------------------------------------------------------
 | Get Upcoming Movies
 |--------------------------------------------------------------------------
 */
const fetchUpcomingMoviesPending = createAction(UPCOMING_MOVIES_ACTIONS.PENDING)
const fetchUpcomingMoviesSuccess = createAction(UPCOMING_MOVIES_ACTIONS.SUCCESS, (upcomingMoveis: IMovie[]) => ({upcomingMoveis}))
const fetchUpcomingMoviesError   = createAction(UPCOMING_MOVIES_ACTIONS.ERROR, (error: any) => ({error}))

const fetchUpcomingMovies = () => {
  return async (dispatch: any) => {
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