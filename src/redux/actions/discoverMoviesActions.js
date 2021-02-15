import { createAction } from 'redux-actions';
import discoverMoviesActionTypes from '../actionTypes/discoverMoviesActionTypes'
import api from '../../api/api'

/*
 |--------------------------------------------------------------------------
 | Get Movies
 |--------------------------------------------------------------------------
 */

const fetchMoviesPending = createAction(discoverMoviesActionTypes.GET_MOVIES_ACTIONS.PENDING)
const fetchMoviesSuccess = createAction(discoverMoviesActionTypes.GET_MOVIES_ACTIONS.SUCCESS, (movies) => ({movies}))
const fetchMoviesError = createAction(discoverMoviesActionTypes.GET_MOVIES_ACTIONS.ERROR, (error) => ({error}))

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

const fetchMoviesGenresSuccess = createAction(discoverMoviesActionTypes.GET_MOVIES_GENRES, (genres) => ({genres}))

const fetchMoviesGenres = () => {
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

const fetcMorehMoviesPending = createAction(discoverMoviesActionTypes.GET_MORE_MOVIES_ACTIONS.PENDING)
const fetchMoreMoviesSuccess = createAction(discoverMoviesActionTypes.GET_MORE_MOVIES_ACTIONS.SUCCESS, (movies) => ({movies}))
const fetchMoreMoviesError = createAction(discoverMoviesActionTypes.GET_MORE_MOVIES_ACTIONS.ERROR, (error) => ({error}))

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

/*
 |--------------------------------------------------------------------------
 | Movies Fileters Functionallities
 |--------------------------------------------------------------------------
 */

const filter = createAction(discoverMoviesActionTypes.FILTER_MOVIES_ACTIONS.FILTER_MOVIES, (movies, filterType) => ({movies, filterType}))
const sort = createAction(discoverMoviesActionTypes.SORTING_MOVIES_ACTIONS.SORT_MOVIES, (movies, sortingType) => ({movies, sortingType}))
const filterByGenres = createAction(discoverMoviesActionTypes.FILTER_MOVIES_ACTIONS.FILTER_BASED_ON_GENRES, (genersId) => ({genersId}))

const filterMovies = (movies, filterType) => {
  return dispatch => {
    dispatch(filter(movies, filterType))
  }
}

const sortMovies = (movies, sortingType) => {
  return dispatch => {
    dispatch(sort(movies, sortingType))
  }
}

const filterMoviesBasedByGenres = (genersId) => {
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