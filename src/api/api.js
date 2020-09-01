import axios from 'axios';

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/"
});

const getMovies = () => api.get(`discover/movie?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
const getMoreMovies = (pageNumber) => api.get(`discover/movie?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`)
const getMovieById = (movieId) => api.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US`)
const getMovieByQuery = (queryParam) => api.get(`https://api.themoviedb.org/3/search/movie?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US&query=${queryParam}&page=1&include_adult=false`)
const getMovieGenres = () => api.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US`)
const getMovieReviews = (movieId) => api.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US&page=1`)
const getUpcomingMovies = () => api.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=63d59f2df02d27e6739533218ba6c9d9&language=en-US&page=1`)

export default {
  getMovies,
  getMoreMovies,
  getMovieById,
  getMovieByQuery,
  getMovieGenres,
  getMovieReviews,
  getUpcomingMovies
}