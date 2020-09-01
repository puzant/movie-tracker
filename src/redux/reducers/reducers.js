import * as actions from '../actionTypes'
import _ from 'lodash'
import { handleActions } from 'redux-actions'

const initialState = {
  pending: false,
  loadMorePending: false,
  movies: [],
  movie: [],
  genres: [],
  searchResults: [],
  movieReviews: [],
  error: false
}

const moviesReducer = handleActions(
  {
    [actions.GET_MOVIES_PENDING]: state => ({...state, pending: true, error: false}),
    [actions.GET_MORE_MOVIES_PENDING]: state => ({...state, loadMorePending: true}),
    [actions.GET_MOVIES_SUCCESS]: (state, {payload}) => {
      return ({
        ...state,
        pending: false,
        error: false,
        movies: payload.movies
      })
    },
    [actions.GET_MORE_MOVIES_SUCCESS]: (state, {payload}) => {
      const newMoviesList = payload.movies
      const {movies} = state
      return ({
        ...state,
        loadMorePending: false,
        movies: [...movies, ...newMoviesList]
      })
    },
    [actions.GET_MOVIES_ERROR]: (state) => ({...state, pending: false, error: true}),
    [actions.FILTER_MOVIES]: (state, {payload}) => {
      let filterMovies;
      if(payload.filterType === actions.BY_HIGHEST_ORDER) {
        filterMovies =  payload.movies.filter((movie) => { return movie.vote_average > 6.9 })
        
        } else if(payload.filterType === actions.BY_ADULT) {
          filterMovies = payload.movies.filter((movie) => { return movie.adult })
        }

        return {
          ...state,
          movies: filterMovies
        }
    },
    [actions.SORT_MOVIES]: (state, {payload}) => {
      let sortedMovies = payload.movies.sort((a,b) => {
        return new Date(b.release_date) - new Date(a.release_date)
      })
      return {
        ...state,
        movies: sortedMovies
      }
    },
    [actions.GET_MOVIE_SUCCESS]: (state, {payload}) => ({...state, movie: payload.movie}),
    [actions.GET_MOVIE_BY_QUERY_SUCCESS]: (state, {payload}) => ({...state, searchResults: payload.searchResults.results}),
    [actions.GET_MOVIE_REVIEWS_SUCCESS]: (state, {payload}) => ({...state, movieReviews: payload.reviews}),
    [actions.GET_GENRES]: (state, {payload}) => ({...state, genres: payload.genres}),
    [actions.FILTER_BASED_ON_GENRES]: (state, {payload}) => {
      let filteredMoviesByGenres = []

      state.movies.map((movie) => {
        for(let i=0; i<movie.genre_ids.length; i++) {
          if(payload.genersId.includes(movie.genre_ids[i])) filteredMoviesByGenres.push(movie)
        }
      })

      let uniqFilteredGenres = [...new Set(filteredMoviesByGenres)]

      //  TODO: we shouldn't reset the movies list based on the Genres filter, preserve the orignal list as well
      return {
        ...state,
        movies: uniqFilteredGenres
      }
    }

  },initialState
)

export default moviesReducer
