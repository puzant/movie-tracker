import { handleActions } from 'redux-actions';
import * as actions from '../actions/actionTypes'

export const initialState = {
  searchResults: [],
  pending: false,
  error: false,
  emptyResults: false
} 

const fetchMovieByQuerySuccess = (state, {payload}) => ({
  ...state,
  searchResults: payload.searchResults.results,
  pending: false,
  error: false
})
const fetchMovieByQueryPending = (state) => ({...state, pending: true, error: false})
const fetchMOvieByQueryError = (state) => ({ ...state, error: true, pending: false })

const searchMovieActionsHandler = {
  [actions.GET_MOVIE_BY_QUERY_SUCCESS]: fetchMovieByQuerySuccess,
  [actions.GET_MOVIE_BY_QUERY_PENDING]: fetchMovieByQueryPending,
  [actions.GET_MOVIE_BY_QUERY_ERROR]: fetchMOvieByQueryError,
}

export default handleActions(searchMovieActionsHandler, initialState)