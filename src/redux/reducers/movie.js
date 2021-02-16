import { handleActions } from 'redux-actions';
import { GET_MOVIE_ACTIONS, REVIEWS_SUCCESS } from '../actionTypes/movieOverviewActionTypes'

export const initialState = {
  movie: [],
  moviePending: false,
  movieError: false,
  genres: [],
  movieReviews: []
}

const fetchMoviePending = (state) => ({...state, moviePending: true})
const fetchMovieSuccess = (state, {payload}) => {
  return ({
    ...state, 
    movie: payload.movie,
    moviePending: false
  })
}
const fetchMovieError = (state) => ({...state, movieError: true})
const fetchMovieReviewsSuccess = (state, {payload}) => ({...state, movieReviews: payload.reviews})

const movieActionHandler = {
  [GET_MOVIE_ACTIONS.PENDING]: fetchMoviePending,
  [GET_MOVIE_ACTIONS.SUCCESS]: fetchMovieSuccess,
  [REVIEWS_SUCCESS]: fetchMovieReviewsSuccess
}

export default handleActions(movieActionHandler, initialState)