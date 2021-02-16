import { createAction } from 'redux-actions';
import { SEARCH_MOVIES_ACTIONS } from '../actionTypes/searchMoviesActionTypes'
import api from '../../api/api'

/*
 |--------------------------------------------------------------------------
 | Get Movie By Query
 |--------------------------------------------------------------------------
 */

const fetchMovieByQuerySuccess = createAction(SEARCH_MOVIES_ACTIONS.SUCCESS, (searchResults) => ({searchResults}))
const fetchMovieByQueryPending = createAction(SEARCH_MOVIES_ACTIONS.PENDING)
const fetchMovieByQueryError = createAction(SEARCH_MOVIES_ACTIONS.ERROR, (error) => ({error}))

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