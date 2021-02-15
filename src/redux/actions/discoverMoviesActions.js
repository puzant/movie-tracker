import { createAction } from 'redux-actions';
import * as actions from './actionTypes'
import api from '../../api/api'

/*
 |--------------------------------------------------------------------------
 | Get Movies
 |--------------------------------------------------------------------------
 */

const fetchMoviesPending = createAction(actions.GET_MOVIES_PENDING)
const fetchMoviesSuccess = createAction(actions.GET_MOVIES_SUCCESS, (movies) => ({movies}))
const fetchMoviesError = createAction(actions.GET_MOVIES_ERROR, (error) => ({error}))

const fetchMovies = () => {
  return async dispatch => {
    try {
      dispatch(fetchMoviesPending());
      const getMoviesResponse = await api.getMovies()
      const results = await dispatch(fetchMoviesSuccess(getMoviesResponse.data.results))
      return results 
    } catch(error) {
        return dispatch(fetchMoviesError(error))
    }
  }
}

/*
 |--------------------------------------------------------------------------
 | Get Movies Genres
 |--------------------------------------------------------------------------
 */

const fetchMoviesGenresSuccess = createAction(actions.GET_GENRES, (genres) => ({genres}))

export function fetchMoviesGenres() {
  return async dispatch => {
    try {
      const getGenresResponse = await api.getMovieGenres()
      return dispatch(fetchMoviesGenresSuccess(getGenresResponse.data.genres))
    } catch(error) {
      console.log(error)
    }
  }
}

/*
 |--------------------------------------------------------------------------
 | Get More Movies
 |--------------------------------------------------------------------------
 */

const fetcMorehMoviesPending = createAction(actions.GET_MORE_MOVIES_PENDING)
const fetchMoreMoviesSuccess = createAction(actions.GET_MORE_MOVIES_SUCCESS, (movies) => ({movies}))
const fetchMoreMoviesError = createAction(actions.GET_MORE_MOVIES_ERROR, (error) => ({error}))

export const fetchMoreMovies = (pageNumber) => {
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

/*
 |--------------------------------------------------------------------------
 | Movies Fileters Functionallities
 |--------------------------------------------------------------------------
 */

const filter = createAction(actions.FILTER_MOVIES, (movies, filterType) => ({movies, filterType}))
const sort = createAction(actions.SORT_MOVIES, (movies, sortingType) => ({movies, sortingType}))
const filterByGenres = createAction(actions.FILTER_BASED_ON_GENRES, (genersId) => ({genersId}))

export function filterMovies(movies, filterType) {
  return dispatch => {
    dispatch(filter(movies, filterType))
  }
}

export function sortMovies(movies, sortingType) {
  return dispatch => {
    dispatch(sort(movies, sortingType))
  }
}

export function filterMoviesBasedByGenres(genersId) {
  return dispatch => {
    dispatch(filterByGenres(genersId))
  }
}

export default {
  fetchMovies,
  fetchMoviesGenres,
  fetchMoreMovies,
  filterMovies,
  sortMovies,
  filterMoviesBasedByGenres
}