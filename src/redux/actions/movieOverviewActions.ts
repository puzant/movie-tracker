import { createAction } from 'redux-actions';
import { GET_MOVIE_ACTIONS, REVIEWS_SUCCESS } from '../actionTypes'
import { getMovieById, getMovieReviews } from 'api'
import { IMovie, Review } from 'api/Models'

/*
  |--------------------------------------------------------------------------
  | Get Movie By Id
  |--------------------------------------------------------------------------
*/

const fetchMovieSuccess = createAction(GET_MOVIE_ACTIONS.SUCCESS, (movie: IMovie) => ({movie}))
const fechMoviePending = createAction(GET_MOVIE_ACTIONS.PENDING)
const fetchMovieError = createAction(GET_MOVIE_ACTIONS.ERROR, (error: any) => ({error}))

const fetchMovieById = (movieId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(fechMoviePending())
      const movieByIdResponse = await getMovieById(movieId)
      return dispatch(fetchMovieSuccess(movieByIdResponse))
    } catch(error) {
        dispatch(fetchMovieError(error))
    }
  }
}

/*
  |--------------------------------------------------------------------------
  | Get Movies Reviews
  |--------------------------------------------------------------------------
*/

const fetchMovieReviewsSuccess = createAction(REVIEWS_SUCCESS, (reviews: Review[]) => ({reviews}))

const fetchMovieReviews = (movieId: string) => {
  return async (dispatch: any) => {
    const movieReviewsResponse = await getMovieReviews(movieId)
  dispatch(fetchMovieReviewsSuccess(movieReviewsResponse.results))
  }
}

export default {
  fetchMovieById,
  fetchMovieReviews
}