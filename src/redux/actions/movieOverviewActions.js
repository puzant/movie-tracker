import { createAction } from 'redux-actions';
import { GET_MOVIE_ACTIONS, REVIEWS_SUCCESS } from '../actionTypes/movieOverviewActionTypes'
import api from '../../api/api'

/*
 |--------------------------------------------------------------------------
 | Get Movie
 |--------------------------------------------------------------------------
 */

const fetchMovieSuccess = createAction(GET_MOVIE_ACTIONS.SUCCESS, (movie) => ({movie}))
const fechMoviePending = createAction(GET_MOVIE_ACTIONS.PENDING)

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

const fetchMovieReviewsSuccess = createAction(REVIEWS_SUCCESS, (reviews) => ({reviews}))

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