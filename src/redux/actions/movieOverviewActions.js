import { createAction } from 'redux-actions';
import * as actions from './actionTypes'
import api from '../../api/api'

/*
 |--------------------------------------------------------------------------
 | Get Movie
 |--------------------------------------------------------------------------
 */

const fetchMovieSuccess = createAction(actions.GET_MOVIE_SUCCESS, (movie) => ({movie}))
const fechMoviePending = createAction(actions.GET_MOVIE_PENDING)

const fetchMovieById = (movieId) => {
 return async dispatch => {
   try {
     dispatch(fechMoviePending())
     const movieByIdResponse = await api.getMovieById(movieId)
     return dispatch(fetchMovieSuccess(movieByIdResponse.data))
   } catch(error) {
      //  dispatch(fetchMoviesError(error))
      //  TODO: create an action type for error
   }
 }
}

/*
 |--------------------------------------------------------------------------
 | Get Movies Reviews
 |--------------------------------------------------------------------------
 */

const fetchMovieReviewsSuccess = createAction(actions.GET_MOVIE_REVIEWS_SUCCESS, (reviews) => ({reviews}))

const fetchMovieReviews = (movieId) => {
  return async dispatch => {
    const movieReviewsResponse = await api.getMovieReviews(movieId)
  dispatch(fetchMovieReviewsSuccess(movieReviewsResponse.data.results))
  }
}

export default {
  fetchMovieById,
  fetchMovieReviews
}