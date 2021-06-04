import { createAction } from 'redux-actions';
import { SEARCH_MOVIES_ACTIONS } from '../actionTypes'
import { getMovieByQuery } from 'api'
import { IMovie } from 'api/Models'

/*
 |--------------------------------------------------------------------------
 | Get Movie By Query
 |--------------------------------------------------------------------------
 */

const fetchMovieByQuerySuccess = createAction(SEARCH_MOVIES_ACTIONS.SUCCESS, (searchResults: IMovie[]) => ({searchResults}))
const fetchMovieByQueryPending = createAction(SEARCH_MOVIES_ACTIONS.PENDING)
const fetchMovieByQueryError = createAction(SEARCH_MOVIES_ACTIONS.ERROR, (error: any) => ({error}))
const emptySearchResults = createAction(SEARCH_MOVIES_ACTIONS.EMPTY)

const fetchMovieByQuery = (query: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(fetchMovieByQueryPending())
      const movieByQueryResponse = await getMovieByQuery(query)
      if (!movieByQueryResponse.data.results.length)
        return dispatch(emptySearchResults())
      
      dispatch(fetchMovieByQuerySuccess(movieByQueryResponse.data))
      
    } catch(error) {
      dispatch(fetchMovieByQueryError(error))
    }
  }
}

export default {
  fetchMovieByQuery 
}