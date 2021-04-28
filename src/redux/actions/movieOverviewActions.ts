import { createAction } from 'redux-actions';
import { GET_MOVIE_ACTIONS, REVIEWS_SUCCESS } from '../actionTypes/movieOverviewActionTypes'
import { getMovieById, getMovieReviews } from '../../api/movie'
import { IMovie, Review } from '../../api/Models'
/*
 |--------------------------------------------------------------------------
 | Get Movie
 |--------------------------------------------------------------------------
 */

const fetchMovieSuccess = createAction(GET_MOVIE_ACTIONS.SUCCESS, (movie: IMovie) => ({movie}))
const fechMoviePending = createAction(GET_MOVIE_ACTIONS.PENDING)

const fetchMovieById = (movieId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(fechMoviePending())
      const movieByIdResponse = await getMovieById(movieId)
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

const fetchMovieReviewsSuccess = createAction(REVIEWS_SUCCESS, (reviews: Review[]) => ({reviews}))

const fetchMovieReviews = (movieId: string) => {
  return async (dispatch: any) => {
    const movieReviewsResponse = await getMovieReviews(movieId)
  dispatch(fetchMovieReviewsSuccess(movieReviewsResponse.data.results))
  }
}

export default {
  fetchMovieById,
  fetchMovieReviews
}