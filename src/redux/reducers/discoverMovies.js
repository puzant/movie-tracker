import { handleActions } from 'redux-actions';
import * as actions from '../actions/actionTypes'
import utils from '../../utils/utils'
import Constants from '../../constants/Constants'

export const initialState = {
  movies: [],
  pending: false,
  error: false,
  loadMorePending: false,
  loadMoreError: false,
  genres: []
}

const fetchMoviesPending = (state) => ({...state, pending: true, error: false})
const fetchMoviesSuccess = (state, {payload}) => {
  return ({
    ...state,
    pending: false,
    error: false,
    movies: payload.movies
  })
}
const fetchMoviesError = (state) => ({...state, pending: false, error: true})
const fetchMoreMoviesPending = (state) => ({...state, loadMoreMoviesError: false, loadMorePending: true})
const fetchMoreMoviesSuccess = (state, {payload}) => {
  const newMoviesList = payload.movies
  const {movies} = state
    return ({
      ...state,
      loadMoreMoviesError: false,
      loadMorePending: false,
      movies: [...movies, ...newMoviesList]
    })
  }
const fetchMoreMoviesError = (state) => ({...state, loadMoreError: true, loadMoreMoviesPending: false})

const fetchGenres = (state, {payload}) => ({...state, genres: payload.genres})

const sortMovies = (state, {payload}) => {
  let sortedMovies
  switch(payload.sortingType) {
    case actions.SORT_BY_RELEASE_DATE_DESCENDING:
      sortedMovies = utils.sortInDescendingOrder(payload.movies, Constants.TMDB_API_DATA.RELEASE_DATE)
      return {
        ...state,
        movies: sortedMovies
      }
    case actions.SORT_BY_RELEASE_DATE_ASCENDING:
      sortedMovies = utils.sortInAscendingOrder(payload.movies, Constants.TMDB_API_DATA.RELEASE_DATE)
      return {
        ...state,
        movies: sortedMovies
      }
    case actions.SORT_BY_POPULARITY_DESCENDING:
      sortedMovies = utils.sortInDescendingOrder(payload.movies, Constants.TMDB_API_DATA.MOVIE_POPULARITY)
      return {
        ...state,
        movies: sortedMovies
      }
    case actions.SORT_BY_POPULARITY_ASCENDING:
      sortedMovies = utils.sortInAscendingOrder(payload.movies, Constants.TMDB_API_DATA.MOVIE_POPULARITY)
      return {
        ...state,
        movies: sortedMovies
      }
    case actions.SORT_BY_RATING_ASCENDING:
      sortedMovies = utils.sortInAscendingOrder(payload.movies, Constants.TMDB_API_DATA.VOTE_AVERAGE)
      return {
        ...state,
        movies: sortedMovies
      }
    case actions.SORT_BY_RATING_DESCENDING:
      sortedMovies = utils.sortInDescendingOrder(payload.movies, Constants.TMDB_API_DATA.VOTE_AVERAGE)
      return {
        ...state,
        movies: sortedMovies
      }
  }
}

const filterMovies = (state, {payload}) => {
  let filterMovies;
  if(payload.filterType === actions.BY_HIGHEST_ORDER) {
    filterMovies =  payload.movies.filter((movie) => { return movie.vote_average > 6.9 })

  } else if(payload.filterType === actions.BY_ADULT) {
      filterMovies = payload.movies.filter((movie) => { return movie.adult })
  }
    return {
      ...state,
      movies: filterMovies
    }
}

const filterBasedOnGenres = (state, {payload}) => {
  let filteredMoviesByGenres = []

  state.movies.map((movie) => {
    for(let i=0; i<movie.genre_ids.length; i++) {
      if(payload.genersId.includes(movie.genre_ids[i])) filteredMoviesByGenres.push(movie)
    }
  })

  let uniqFilteredGenres = [...new Set(filteredMoviesByGenres)]

  //  TODO: we shouldn't reset the movies list based on the Genres filter, preserve the orignal list as well
  return {
    ...state,
    movies: uniqFilteredGenres
  }
}

const moviesActionHandler = {
  [actions.GET_MOVIES_PENDING]: fetchMoviesPending,
  [actions.GET_MOVIES_SUCCESS]: fetchMoviesSuccess,
  [actions.GET_MOVIES_ERROR]: fetchMoviesError,
  [actions.GET_MORE_MOVIES_PENDING]: fetchMoreMoviesPending,
  [actions.GET_MORE_MOVIES_SUCCESS]: fetchMoreMoviesSuccess,
  [actions.GET_MORE_MOVIES_ERROR]: fetchMoreMoviesError,
  [actions.SORT_MOVIES]: sortMovies,
  [actions.FILTER_MOVIES]: filterMovies,
  [actions.FILTER_BASED_ON_GENRES]: filterBasedOnGenres,
  [actions.GET_GENRES]: fetchGenres
}

export default handleActions(moviesActionHandler, initialState)