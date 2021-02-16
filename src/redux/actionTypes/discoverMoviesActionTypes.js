export const GET_MOVIES_ACTIONS = {
  SUCCESS: "getMoviesSuccess",
  PENDING: "getMoviesPending",
  ERROR: "getMoviesError"
}

export const GET_MORE_MOVIES_ACTIONS = {
  SUCCESS: "getMoreMovies",
  PENDING: "getMoreMoviesPending",
  ERROR: "getMoreMoviesError"
}

export const GET_MOVIES_GENRES = "getGenres"

export const FILTER_MOVIES_ACTIONS = {
  FILTER_MOVIES: "filterMovies",
  BY_HIGHEST_ORDER: "highestRating",
  FILTER_BASED_ON_GENRES: "filterBasedOnGenres",
  BY_ADULT: "adult"
}

export const SORTING_MOVIES_ACTIONS = {
  SORT_MOVIES: "sortMovies",
  BY_POPULARITY_DESCENDING: "popularityDescending",
  BY_POPULARITY_ASCENDING: "popularityAscending",
  BY_RATING_DESCENDING: "ratingDescending",
  BY_RATING_ASCENDING: "ratingAscending",
  BY_RELEASE_DATE_DESCENDING: "releaseDateDescending",
  BY_RELEASE_DATE_ASCENDING: "releaseDateAscending",
}
