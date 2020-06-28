import * as actions from '../actionTypes'

const initialState = {
  pending: false,
  movies: [],
  movie: [],
  searchResults: [],
  error: false
}

export default function moviesReducer(state = initialState, action) {
  switch(action.type) {
    case actions.GET_MOVIES_PENDING:
      return {
        ...state,
        pending: true
      }
    case actions.GET_MOVIES_SUCCESS:
      return {
        ...state,
        pending: false,
        movies: action.payload.movies
      }
    case actions.GET_MOVIES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case actions.FILTER_MOVIES:
      let filterMovies;
      if(action.payload.filterType === actions.BY_HIGHEST_ORDER) {
         filterMovies =  action.payload.movies.filter(function(movie) {
          return movie.vote_average > 6.9;
        })
      } else if(action.payload.filterType === actions.BY_ADULT) {
        filterMovies = action.payload.movies.filter(function(movie) {
          return movie.adult
        })
      }
      return {
        ...state,
        movies: filterMovies
      }
    case actions.SORT_MOVIES:
      let sortedMovies = action.payload.movies.sort(function(a,b){
        return new Date(b.release_date) - new Date(a.release_date)
      })
      return {
        ...state,
        movies: sortedMovies
      }
    case actions.GET_MOVIE_SUCCESS: 
      return {
        ...state,
        movie: action.payload.movie
      }
    case actions.GET_MOVIE_BY_QUERY_SUCCESS:
      return {
        ...state,
        searchResults: action.payload.searchResults.results
      }
    default: 
      return state
  }

}