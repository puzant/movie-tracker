import { createAction } from 'redux-actions';
import * as actions from './actionTypes'
import api from '../../api/api'

/*
 |--------------------------------------------------------------------------
 | Get Movie By Query
 |--------------------------------------------------------------------------
 */

const fetchMovieByQuerySuccess = createAction(actions.GET_MOVIE_BY_QUERY_SUCCESS, (searchResults) => ({searchResults}))
const fetchMovieByQueryPending = createAction(actions.GET_MOVIE_BY_QUERY_PENDING)
const fetchMovieByQueryError = createAction(actions.GET_MOVIE_BY_QUERY_ERROR, (error) => ({error}))

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