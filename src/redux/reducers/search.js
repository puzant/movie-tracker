import { handleActions } from 'redux-actions';
import { SEARCH_MOVIES_ACTIONS } from '../actionTypes/searchMoviesActionTypes'

export const initialState = {
  searchResults: [],
  pending: false,
  error: false,
  empty: false
} 

const fetchMovieByQuerySuccess = (state, {payload}) => ({
  ...state,
  searchResults: payload.searchResults.results,
  pending: false,
  error: false,
  empty: false
})
const fetchMovieByQueryPending = (state) => ({...state, pending: true, error: false})
const fetchMOvieByQueryError = (state) => ({ ...state, error: true, pending: false })
const emptyResults = (state) => ({...state, searchResults: [], pending: false, empty: true})

const searchMovieActionsHandler = {
  [SEARCH_MOVIES_ACTIONS.SUCCESS]: fetchMovieByQuerySuccess,
  [SEARCH_MOVIES_ACTIONS.PENDING]: fetchMovieByQueryPending,
  [SEARCH_MOVIES_ACTIONS.ERROR]: fetchMOvieByQueryError,
  [SEARCH_MOVIES_ACTIONS.EMPTY]: emptyResults,
}

export default handleActions(searchMovieActionsHandler, initialState)