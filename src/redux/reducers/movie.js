import { handleActions } from 'redux-actions';
import * as actions from '../actions/actionTypes'

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
  [actions.GET_MOVIE_PENDING]: fetchMoviePending,
  [actions.GET_MOVIE_SUCCESS]: fetchMovieSuccess,
  [actions.GET_MOVIE_REVIEWS_SUCCESS]: fetchMovieReviewsSuccess
}

export default handleActions(movieActionHandler, initialState)