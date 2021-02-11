import { createAction } from 'redux-actions';
import * as actions from './actionTypes'
import api from '../../api/api'
import auth from '../../api/authentication'

/*
 |--------------------------------------------------------------------------
 | Get Movies
 |--------------------------------------------------------------------------
 */

const fetchMoviesPending = createAction(actions.GET_MOVIES_PENDING)
const fetchMoviesSuccess = createAction(actions.GET_MOVIES_SUCCESS, (movies) => ({movies}))
const fetchMoviesError = createAction(actions.GET_MOVIES_ERROR, (error) => ({error}))

export const fetchMovies = () => {
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
 | Get Movie
 |--------------------------------------------------------------------------
 */

 const fetchMovieSuccess = createAction(actions.GET_MOVIE_SUCCESS, (movie) => ({movie}))
 const fechMoviePending = createAction(actions.GET_MOVIE_PENDING)

 export const fetchMovieById = (movieId) => {
  return async dispatch => {
    try {
      dispatch(fechMoviePending())
      const movieByIdResponse = await api.getMovieById(movieId)
      return dispatch(fetchMovieSuccess(movieByIdResponse.data))
    } catch(error) {
        dispatch(fetchMoviesError(error))
    }
  }
}

/*
 |--------------------------------------------------------------------------
 | Get Movie By Query
 |--------------------------------------------------------------------------
 */

const fetchMovieByQuerySuccess = createAction(actions.GET_MOVIE_BY_QUERY_SUCCESS, (searchResults) => ({searchResults}))
const fetchMovieByQueryPending = createAction(actions.GET_MOVIE_BY_QUERY_PENDING)
const fetchMovieByQueryError = createAction(actions.GET_MOVIE_BY_QUERY_ERROR, (error) => ({error}))

export const fetchMovieByQuery = (query) => {
  return async dispatch => {
    try {
      dispatch(fetchMovieByQueryPending())
      const movieByQueryResponse = await api.getMovieByQuery(query)
      return dispatch(fetchMovieByQuerySuccess(movieByQueryResponse.data))
    } catch(error) {
      dispatch(fetchMovieByQueryError(error))
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
 | Get Movies Reviews
 |--------------------------------------------------------------------------
 */

const fetchMovieReviewsSuccess = createAction(actions.GET_MOVIE_REVIEWS_SUCCESS, (reviews) => ({reviews}))

export const fetchMovieReviews = (movieId) => {
  return async dispatch => {
    const movieReviewsResponse = await api.getMovieReviews(movieId)
  dispatch(fetchMovieReviewsSuccess(movieReviewsResponse.data.results))
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
  return async dispatch => {
    try {
      dispatch(fetchUpcomingMoviesPending())
      const upcomingMoviesResponse = await api.getUpcomingMovies()
      dispatch(fetchUpcomingMoviesSuccess(upcomingMoviesResponse.data.results))
    } catch(error) {
      dispatch(fetchUpcomingMoviesError(error))
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

/*
 |--------------------------------------------------------------------------
 | Login User
 |--------------------------------------------------------------------------
 */

 const login = createAction(actions.LOGIN)
 const authSuccess = createAction(actions.LOGIN_SUCCESS)

 export const loginUser = (username, password) => {
   let requestToken, sessionId, accountId
    return async (dispatch) => {

     try {
       dispatch(login)
       const requestTokenResponse = await auth.getRequestToken()
       requestToken = requestTokenResponse.data.request_token  
       dispatch(authSuccess)
     } catch(error) {
       console.log(error)
     }

     try {
      const loginResponse = await auth.login(username, password, requestToken)
     } catch(error) {
       console.log(error)
     }
     
     try {
      const sessionResponse = await auth.createSession(requestToken)  
      sessionId = sessionResponse.data.session_id
     } catch(error) {
       console.log(error)
     }

     try {
       const userAccountResponse = await auth.getAccount(sessionId)
       accountId = userAccountResponse.data.id
     } catch(error) {
       console.log(error)
     }
   }
 }