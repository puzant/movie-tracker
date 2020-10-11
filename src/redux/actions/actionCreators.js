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

export function fetchMovies() {
  return dispatch => {
    dispatch(fetchMoviesPending());
      return api.getMovies()
        .then((response) => {
          return dispatch(fetchMoviesSuccess(response.data.results))
        }).catch((error) => {
          return dispatch(fetchMoviesError(error))
        })
    };
}

/*
 |--------------------------------------------------------------------------
 | Get More Movies
 |--------------------------------------------------------------------------
 */

 const fetcMorehMoviesPending = createAction(actions.GET_MORE_MOVIES_PENDING)
 const fetchMoreMoviesSuccess = createAction(actions.GET_MORE_MOVIES_SUCCESS, (movies) => ({movies}))
 const fetchMoreMoviesError = createAction(actions.GET_MORE_MOVIES_ERROR, (error) => ({error}))

 export function fetchMoreMovies(pageNumber) {
  return dispatch => {
    dispatch(fetcMorehMoviesPending())
    return api.getMoreMovies(pageNumber)
        .then((response) => {
          dispatch(fetchMoreMoviesSuccess(response.data.results))
        })
        .then((error) => {
          dispatch(fetchMoreMoviesError(error))
        })
    }
}

/*
 |--------------------------------------------------------------------------
 | Get Movie
 |--------------------------------------------------------------------------
 */

 const fetchMovieSuccess = createAction(actions.GET_MOVIE_SUCCESS, (movie) => ({movie}))

 export function fetchMovieById(movieId) {
  return dispatch => {
    return api.getMovieById(movieId)
      .then((response) => {
        dispatch(fetchMovieSuccess(response.data))
      })
      .then((error) => {
        dispatch(fetchMoviesError(error))
      })
  }
}


/*
 |--------------------------------------------------------------------------
 | Get Movie By Query
 |--------------------------------------------------------------------------
 */

const fetchMovieByQuerySucess = createAction(actions.GET_MOVIE_BY_QUERY_SUCCESS, (searchResults) => ({searchResults}))

export function fetchMovieByQuery(query) {
  return dispatch => {
    api.getMovieByQuery(query)
      .then((response) => {
        dispatch(fetchMovieByQuerySucess(response.data))
      })
      .then((error) => {
        dispatch(fetchMoviesError(error))
      })
  }
}

/*
 |--------------------------------------------------------------------------
 | Get Movies Genres
 |--------------------------------------------------------------------------
 */

const fetchMoviesGenresSuccess = createAction(actions.GET_GENRES, (genres) => ({genres}))

export function fetchMoviesGenres() {
  return dispatch => {
    return api.getMovieGenres()
      .then((response) => {
        dispatch(fetchMoviesGenresSuccess(response.data.genres))
      })
  }
}

/*
 |--------------------------------------------------------------------------
 | Get Movies Reviews
 |--------------------------------------------------------------------------
 */

const fetchMovieReviewsSuccess = createAction(actions.GET_MOVIE_REVIEWS_SUCCESS, (reviews) => ({reviews}))

export function fetchMovieReviews(movieId) {
  return dispatch => {
    return api.getMovieReviews(movieId)
      .then((response) => {
        dispatch(fetchMovieReviewsSuccess(response.data.results))
      })
  }
}

/*
 |--------------------------------------------------------------------------
 | Get Upcoming Movies
 |--------------------------------------------------------------------------
 */
const fetchUpcomingMoviesPending = createAction(actions.GET_UPCOMING_MOVIES_PENDING)
const fetchUpcomingMoviesSuccess = createAction(actions.GET_UPCOMING_MOVIES_SUCCESS, (upcomingMoveis) => ({upcomingMoveis}))
const fetchUpcomingMoviesError   = createAction(actions.GET_UPCOMING_MOVIES_ERROR, (error) => ({error}))

export function fetchUpcomingMovies() {
  return dispatch => {
    dispatch(fetchUpcomingMoviesPending())
    return api.getUpcomingMovies()
      .then((response) => {
        dispatch(fetchUpcomingMoviesSuccess(response.data.results))
      }).catch((error) => {
        dispatch(fetchUpcomingMoviesError(error))
      })
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
