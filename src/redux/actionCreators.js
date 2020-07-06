import * as actions from './actionTypes'
import axios from 'axios';

export function fetchMoviesPending() {
  return {
    type: actions.GET_MOVIES_PENDING
  }
}

export function fetchMoviesSuccess(movies) {
  return {
    type: actions.GET_MOVIES_SUCCESS,
    payload: {
      movies: movies
    }
  }
}

export function fetchMovieSuccess(movie) {
  return {
    type: actions.GET_MOVIE_SUCCESS,
    payload: {
      movie: movie
    }
  }
}

export function fetchMovieByQuerySucess(searchResults) {
  return  {
    type: actions.GET_MOVIE_BY_QUERY_SUCCESS,
    payload: {
      searchResults: searchResults
    }
  }
}


export function fetchMoviesError(error) {
  return {
    type: actions.GET_MOVIES_ERROR, 
    payload: {
      error: error
    }
  }
}

export function fetchMovieReviewsSuccess(reviews) {
  return {
    type: actions.GET_MOVIE_REVIEWS_SUCCESS,
    payload: {
      reviews: reviews
    }
  }
}

export function filterMovies(movies, filterType) {
  return {
    type: actions.FILTER_MOVIES, 
    payload: {
      movies: movies,
      filterType: filterType
    }
  }
}

export function sortMovies(movies) {
  return {
    type: actions.SORT_MOVIES, 
    payload: {
      movies: movies
    }
  }
}

export function fetchMovies() {
  return dispatch => {
    dispatch(fetchMoviesPending());
    return axios.get("https://api.themoviedb.org/3/discover/movie?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1")
      .then(function(response) {
        dispatch(fetchMoviesSuccess(response.data.results))
      })
  };
}


export function fetchMovieById(movieId) {
  return dispatch => {
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US`)
      .then(function(response) {
        dispatch(fetchMovieSuccess(response.data))
      })
      .then(function(error) {
        dispatch(fetchMoviesError())
      })
  }
}

export function fetchMovieByQuery(query) {
  return dispatch => {
    return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US&query=${query}&page=1&include_adult=false`)
      .then(function(response) {
        dispatch(fetchMovieByQuerySucess(response.data))
      })
      .then(function(error) {
        dispatch(fetchMoviesError())
      })
  }
}

export function fetchMovieReviews(movieId) {
  return dispatch => {
    return axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US&page=1`)
      .then(function(response) {
        dispatch(fetchMovieReviewsSuccess(response.data.results))
      })
  }
}