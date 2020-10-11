/** Actions for Movies */
export const GET_MOVIES_SUCCESS = "getMoviesSuccess"
export const GET_MOVIES_PENDING = "getMoviesPending"
export const GET_MOVIES_ERROR = "getMoviesError"

/** Actions for Load More Movies */
export const GET_MORE_MOVIES_SUCCESS = "getMoreMovies"
export const GET_MORE_MOVIES_PENDING = "getMoreMoviesPending"
export const GET_MORE_MOVIES_ERROR = "getMoreMoviesError"

/** Actions for Movie */
export const GET_MOVIE_SUCCESS = "getMovieSuccess"
export const GET_MOVIE_BY_QUERY_SUCCESS = "getMovieByQuerySuccess"
export const GET_MOVIE_REVIEWS_SUCCESS = "getMovieReviewsSuccess"
export const GET_GENRES = "getGenres"

/** Actions for Movies Filters */
export const FILTER_MOVIES = "filterMovies"
export const BY_HIGHEST_ORDER = "highestRating"
export const FILTER_BASED_ON_GENRES = "filterBasedOnGenres"
export const BY_ADULT = "adult"

/** Actions for Movies Sorting */
export const SORT_MOVIES = "sortMovies"
export const SORT_BY_POPULARITY_DESCENDING = "popularityDescending"
export const SORT_BY_POPULARITY_ASCENDING = "popularityAscending"
export const SORT_BY_RATING_DESCENDING = "ratingDescending"
export const SORT_BY_RATING_ASCENDING = "ratingAscending"
export const SORT_BY_RELEASE_DATE_DESCENDING = "releaseDateDescending"
export const SORT_BY_RELEASE_DATE_ASCENDING = "releaseDateAscending"


/** Actions for Upcomning Movies */
export const GET_UPCOMING_MOVIES_SUCCESS = "getUpcomingMoviesSuccess"
export const GET_UPCOMING_MOVIES_PENDING = "getUpcomingMoviesPending"
export const GET_UPCOMING_MOVIES_ERROR = "getUpcomingMoviesError"

//  TODO: use this instead
// export default {
//   GET_MOVIES_ACTIONS: {
//     GET_MOVIES_SUCCESS: "getMoviesSuccess",
//     GET_MOVIES_PENDING: "getMoviesPending",
//     GET_MOVIES_ERROR: "getMoviesError"
//   },
//   GET_MORE_MOVIES_ACTIONS: {
//     GET_MORE_MOVIES_SUCCESS: "getMoreMovies",
//     GET_MORE_MOVIES_PENDING: "getMoreMoviesPending",
//     GET_MORE_MOVIES_ERROR: "getMoreMoviesError"
//   },
//   GET_MOVIE_ACTIONS: {
//     GET_MOVIE_SUCCESS: "getMovieSuccess",
//     GET_MOVIE_BY_QUERY_SUCCESS: "getMovieByQuerySuccess",
//     GET_MOVIE_REVIEWS_SUCCESS: "getMovieReviewsSuccess",
//     GET_GENRES: "getGenres"
//   },
//   GET_UPCOMING_MOVIES_ACTIONS: {
//     GET_UPCOMING_MOVIES_SUCCESS: "getUpcomingMoviesSuccess",
//     GET_UPCOMING_MOVIES_PENDING: "getUpcomingMoviesPending",
//     GET_UPCOMING_MOVIES_ERROR: "getUpcomingMoviesError"
//   },
//   FILTER_MOVIES_ACTIONS: {
//     FILTER_MOVIES: "filterMovies",
//     BY_HIGHEST_ORDER: "highestRating",
//     FILTER_BASED_ON_GENRES: "filterBasedOnGenres",
//     BY_ADULT: "adult"
//   },
//   SORING_MOVIES_ACTIONS: {
//     SORT_MOVIES: "sortMovies"
//   }
// }