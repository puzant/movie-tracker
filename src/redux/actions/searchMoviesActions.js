import { createAction } from 'redux-actions';
import searchMoviesActions from '../actionTypes/searchMoviesActionTypes'
import api from '../../api/api'

/*
 |--------------------------------------------------------------------------
 | Get Movie By Query
 |--------------------------------------------------------------------------
 */

const fetchMovieByQuerySuccess = createAction(searchMoviesActions.SEARCH_MOVIES_ACTIONS.GET_MOVIE_BY_QUERY_SUCCESS, (searchResults) => ({searchResults}))
const fetchMovieByQueryPending = createAction(searchMoviesActions.SEARCH_MOVIES_ACTIONS.GET_MOVIE_BY_QUERY_PENDING)
const fetchMovieByQueryError = createAction(searchMoviesActions.SEARCH_MOVIES_ACTIONS.GET_MOVIE_BY_QUERY_ERROR, (error) => ({error}))

const fetchMovieByQuery = (query) => {
  return async dispatch => {
    try {
      dispatch(fetchMovieByQueryPending())
      const movieByQueryResponse = await api.getMovieByQuery(query)
      return dispatch(fetchMovieByQuerySuccess(movieByQueryResponse.data))
    } catch(error) {
      dispatch(fetchMovieByQueryError(error))
    }
  }
}

export default {
  fetchMovieByQuery 
}