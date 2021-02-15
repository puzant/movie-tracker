import { createAction } from 'redux-actions';
import * as actions from './actionTypes'
import api from '../../api/api'

const fetcMorehMoviesPending = createAction(actions.GET_MORE_MOVIES_PENDING)
 const fetchMoreMoviesSuccess = createAction(actions.GET_MORE_MOVIES_SUCCESS, (movies) => ({movies}))
 const fetchMoreMoviesError = createAction(actions.GET_MORE_MOVIES_ERROR, (error) => ({error}))

 const fetchMoreMovies = (pageNumber) => {
  return async dispatch => {
    try {
      dispatch(fetcMorehMoviesPending())
      const getMoreMoviesResposne = await api.getMoreMovies(pageNumber)
      dispatch(fetchMoreMoviesSuccess(getMoreMoviesResposne.data.results))
    } catch(error) {
        dispatch(fetchMoreMoviesError(error))
    }
  }
 }

 export default {
   fetchMoreMovies
 }