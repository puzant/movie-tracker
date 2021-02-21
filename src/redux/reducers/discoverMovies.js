import { handleActions } from 'redux-actions';
import { 
  GET_MOVIES_ACTIONS,
  GET_MORE_MOVIES_ACTIONS,
  GET_MOVIES_GENRES,
  FILTER_MOVIES_ACTIONS,
  SORTING_MOVIES_ACTIONS 
} from '../actionTypes/discoverMoviesActionTypes'
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
    case SORTING_MOVIES_ACTIONS.BY_RELEASE_DATE_DESCENDING:
      sortedMovies = utils.sortInDescendingOrder(payload.movies, Constants.TMDB_API_DATA.RELEASE_DATE)
      return {
        ...state,
        movies: sortedMovies
      }
    case SORTING_MOVIES_ACTIONS.BY_RELEASE_DATE_ASCENDING:
      sortedMovies = utils.sortInAscendingOrder(payload.movies, Constants.TMDB_API_DATA.RELEASE_DATE)
      return {
        ...state,
        movies: sortedMovies
      }
    case SORTING_MOVIES_ACTIONS.BY_POPULARITY_DESCENDING:
      sortedMovies = utils.sortInDescendingOrder(payload.movies, Constants.TMDB_API_DATA.MOVIE_POPULARITY)
      return {
        ...state,
        movies: sortedMovies
      }
    case SORTING_MOVIES_ACTIONS.BY_POPULARITY_ASCENDING:
      sortedMovies = utils.sortInAscendingOrder(payload.movies, Constants.TMDB_API_DATA.MOVIE_POPULARITY)
      return {
        ...state,
        movies: sortedMovies
      }
    case SORTING_MOVIES_ACTIONS.BY_RATING_ASCENDING:
      sortedMovies = utils.sortInAscendingOrder(payload.movies, Constants.TMDB_API_DATA.VOTE_AVERAGE)
      return {
        ...state,
        movies: sortedMovies
      }
    case SORTING_MOVIES_ACTIONS.BY_RATING_DESCENDING:
      sortedMovies = utils.sortInDescendingOrder(payload.movies, Constants.TMDB_API_DATA.VOTE_AVERAGE)
      return {
        ...state,
        movies: sortedMovies
      }
    default:
      return
  }
}

const filterMovies = (state, {payload}) => {
  let filterMovies;
  if(payload.filterType === FILTER_MOVIES_ACTIONS.BY_HIGHEST_ORDER) {
    filterMovies =  payload.movies.filter((movie) => { return movie.vote_average > 6.9 })

  } else if(payload.filterType === FILTER_MOVIES_ACTIONS.BY_ADULT) {
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
      if(payload.genersId.includes(movie.genre_ids[i])) 
        filteredMoviesByGenres.push(movie)
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
  [GET_MOVIES_ACTIONS.PENDING]: fetchMoviesPending,
  [GET_MOVIES_ACTIONS.SUCCESS]: fetchMoviesSuccess,
  [GET_MOVIES_ACTIONS.ERROR]: fetchMoviesError,
  [GET_MORE_MOVIES_ACTIONS.PENDING]: fetchMoreMoviesPending,
  [GET_MORE_MOVIES_ACTIONS.SUCCESS]: fetchMoreMoviesSuccess,
  [GET_MORE_MOVIES_ACTIONS.ERROR]: fetchMoreMoviesError,
  [SORTING_MOVIES_ACTIONS.SORT_MOVIES]: sortMovies,
  [FILTER_MOVIES_ACTIONS.FILTER_MOVIES]: filterMovies,
  [FILTER_MOVIES_ACTIONS.FILTER_BASED_ON_GENRES]: filterBasedOnGenres,
  [GET_MOVIES_GENRES]: fetchGenres
}

export default handleActions(moviesActionHandler, initialState)