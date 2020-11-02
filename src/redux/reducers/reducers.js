import * as actions from '../actions/actionTypes'
import _ from 'lodash'
import { handleActions } from 'redux-actions'
import Constants from '../../constants/Constants'

const initialState = {
  //  movies data props
  movies: [],
  pending: false,
  error: false,
  loadMorePending: false,
  loadMoreMoviesError: false,
  //  movie summery data props
  movie: [],
  moviePending: false,
  genres: [],
  searchResults: [],
  movieReviews: [],
  //  upcoming movies data props
  upcomingMovies: [],
  upcomingMoviesPending: false,
  upcomingMoviesError: false,
}

//  Key is the object property name to be accessed
let sortInDescendingOrder = (data, key) => {
  return data.sort((a,b) => {
    return key == Constants.TMDB_API_DATA.RELEASE_DATE ?
     new Date(b[key]) - new Date(a[key]) 
     : b[key] - a[key]
  })
}

let sortInAscendingOrder = (data, key) => {
  return data.sort((a,b) => {
    return key == Constants.TMDB_API_DATA.RELEASE_DATE ?
     new Date(a[key]) - new Date(b[key]) 
     : a[key] - b[key]
  })
}

const moviesReducer = handleActions(
  {
    [actions.GET_MOVIES_PENDING]: state => ({...state, pending: true, error: false}),
    [actions.GET_MORE_MOVIES_PENDING]: state => ({...state, loadMoreMoviesError: false, loadMorePending: true}),
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
        loadMoreMoviesError: false,
        loadMorePending: false,
        movies: [...movies, ...newMoviesList]
      })
    },
    [actions.GET_MOVIES_ERROR]: (state) => ({...state, pending: false, error: true}),
    [actions.GET_MORE_MOVIES_ERROR]: (state,) => ({...state, loadMoreMoviesError: true, loadMorePending: false}),
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
      let sortedMovies
      switch(payload.sortingType) {
        case actions.SORT_BY_RELEASE_DATE_DESCENDING:
          sortedMovies = sortInDescendingOrder(payload.movies, Constants.TMDB_API_DATA.RELEASE_DATE)
          return {
            ...state,
            movies: sortedMovies
          }
        case actions.SORT_BY_RELEASE_DATE_ASCENDING:
          sortedMovies = sortInAscendingOrder(payload.movies, Constants.TMDB_API_DATA.RELEASE_DATE)
          return {
            ...state,
            movies: sortedMovies
          }
        case actions.SORT_BY_POPULARITY_DESCENDING:
          sortedMovies = sortInDescendingOrder(payload.movies, Constants.TMDB_API_DATA.MOVIE_POPULARITY)
          return {
            ...state,
            movies: sortedMovies
          }
        case actions.SORT_BY_POPULARITY_ASCENDING:
          sortedMovies = sortInAscendingOrder(payload.movies, Constants.TMDB_API_DATA.MOVIE_POPULARITY)
          return {
            ...state,
            movies: sortedMovies
          }
        case actions.SORT_BY_RATING_ASCENDING:
          sortedMovies = sortInAscendingOrder(payload.movies, Constants.TMDB_API_DATA.VOTE_AVERAGE)
          return {
            ...state,
            movies: sortedMovies
          }
        case actions.SORT_BY_RATING_DESCENDING:
          sortedMovies = sortInDescendingOrder(payload.movies, Constants.TMDB_API_DATA.VOTE_AVERAGE)
          return {
            ...state,
            movies: sortedMovies
          }
      }
    },
    [actions.GET_MOVIE_PENDING]: state => ({...state, moviePending: true}),
    [actions.GET_MOVIE_SUCCESS]: (state, {payload}) => {
      return ({
        ...state, 
        movie: payload.movie,
        moviePending: false
      })
    },
    [actions.GET_MOVIE_BY_QUERY_SUCCESS]: (state, {payload}) => ({...state, searchResults: payload.searchResults.results}),
    [actions.GET_MOVIE_REVIEWS_SUCCESS]: (state, {payload}) => ({...state, movieReviews: payload.reviews}),
    //  upcoming movies reducers
    [actions.GET_UPCOMING_MOVIES_PENDING]: (state) => ({...state, upcomingMoviesPending: true, upcomingMoviesError: false}),
    [actions.GET_UPCOMING_MOVIES_ERROR]: (state) => ({...state, upcomingMoviesError: true, upcomingMoviesPending: false}),
    [actions.GET_UPCOMING_MOVIES_SUCCESS]: (state, {payload}) => {
      return ({
        ...state,
        upcomingMovies: payload.upcomingMoveis,
        upcomingMoviesPending: false,
        upcomingMoviesError: false
      })
    },
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
