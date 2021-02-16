import { handleActions } from 'redux-actions';
import { SEARCH_MOVIES_ACTIONS } from '../actionTypes/searchMoviesActionTypes'

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
  [SEARCH_MOVIES_ACTIONS.SUCCESS]: fetchMovieByQuerySuccess,
  [SEARCH_MOVIES_ACTIONS.PENDING]: fetchMovieByQueryPending,
  [SEARCH_MOVIES_ACTIONS.ERROR]: fetchMOvieByQueryError,
}

export default handleActions(searchMovieActionsHandler, initialState)