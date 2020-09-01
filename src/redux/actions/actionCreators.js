import { createAction } from 'redux-actions';
import * as actions from './actionTypes'
import axios from 'axios';

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
    return axios
      .get("https://api.themoviedb.org/3/discover/movie?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
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

 export function fetchMoreMovies(pageNumber) {
  return dispatch => {
    dispatch(fetcMorehMoviesPending())
    return axios
      .get(`https://api.themoviedb.org/3/discover/movie?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`)
        .then((response) => {
          dispatch(fetchMoreMoviesSuccess(response.data.results))
        })
        .then((error) => {
          dispatch(fetchMoviesError(error))
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
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US`)
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
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US&query=${query}&page=1&include_adult=false`)
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
    return axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US")
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
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US&page=1`)
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

export function fetchUpcomingMovies() {
  return dispatch => {
    return axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US&page=1")
      .then((response) => {
        //  TODO: create action for the upcoming movies
      }).catch((error) => {
        //  TODO: create a new action for catching errors
      })
  }
}

/*
 |--------------------------------------------------------------------------
 | Movies Fileters Functionallities
 |--------------------------------------------------------------------------
 */


const filter = createAction(actions.FILTER_MOVIES, (movies, filterType) => ({movies, filterType}))
const sort = createAction(actions.SORT_MOVIES, (movies) => ({movies}))
const filterByGenres = createAction(actions.FILTER_BASED_ON_GENRES, (genersId) => ({genersId}))

export function filterMovies(movies, filterType) {
  return dispatch => {
    dispatch(filter(movies, filterType))
  }
}

export function sortMovies(movies) {
  return dispatch => {
    dispatch(sort(movies))
  }
}


export function filterMoviesBasedByGenres(genersId) {
  return dispatch => {
    dispatch(filterByGenres(genersId))
  }
}
