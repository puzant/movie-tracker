import { createAction } from 'redux-actions';
import { 
    GET_MOVIES_ACTIONS,
    GET_MORE_MOVIES_ACTIONS,
    GET_MOVIES_GENRES,
    FILTER_MOVIES_ACTIONS,
    SORTING_MOVIES_ACTIONS 
  } from '../actionTypes'
import { getMovies, getMovieGenres, getMoreMovies } from 'api'

/*
 |--------------------------------------------------------------------------
 | Get Movies
 |--------------------------------------------------------------------------
 */

const fetchMoviesPending = createAction(GET_MOVIES_ACTIONS.PENDING)
const fetchMoviesSuccess = createAction(GET_MOVIES_ACTIONS.SUCCESS, (movies) => ({movies}))
const fetchMoviesError = createAction(GET_MOVIES_ACTIONS.ERROR, (error) => ({error}))

const fetchMovies = () => {
  return async dispatch => {
    try {
      dispatch(fetchMoviesPending());
      const getMoviesResponse = await getMovies()
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

const fetchMoviesGenresSuccess = createAction(GET_MOVIES_GENRES, (genres) => ({genres}))

const fetchMoviesGenres = () => {
  return async dispatch => {
    try {
      const getGenresResponse = await getMovieGenres()
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

const fetcMorehMoviesPending = createAction(GET_MORE_MOVIES_ACTIONS.PENDING)
const fetchMoreMoviesSuccess = createAction(GET_MORE_MOVIES_ACTIONS.SUCCESS, (movies) => ({movies}))
const fetchMoreMoviesError = createAction(GET_MORE_MOVIES_ACTIONS.ERROR, (error) => ({error}))

const fetchMoreMovies = (pageNumber) => {
  return async dispatch => {
    try {
      dispatch(fetcMorehMoviesPending())
      const getMoreMoviesResposne = await getMoreMovies(pageNumber)
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

const filter = createAction(FILTER_MOVIES_ACTIONS.FILTER_MOVIES, (movies, filterType) => ({movies, filterType}))
const sort = createAction(SORTING_MOVIES_ACTIONS.SORT_MOVIES, (movies, sortingType) => ({movies, sortingType}))
const filterByGenres = createAction(FILTER_MOVIES_ACTIONS.FILTER_BASED_ON_GENRES, (genre) => ({genre}))

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

const filterMoviesBasedByGenres = (genreId) => {
  return dispatch => {
    dispatch(filterByGenres(genreId))
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