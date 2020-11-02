import axios from 'axios';

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/"
});

const API_KEY = `63d59f2df02d27e6739533218ba6c9d9`

const getMovies = () => api.get(`discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
const getMoreMovies = (pageNumber) => api.get(`discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`)
const getMovieById = (movieId) => api.get(`movie/${movieId}?append_to_response=credits,keyword,recommendations&api_key=${API_KEY}`)
const getMovieByQuery = (queryParam) => api.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${queryParam}&page=1&include_adult=false`)
const getMovieGenres = () => api.get(`genre/movie/list?api_key=${API_KEY}&language=en-US`)
const getMovieReviews = (movieId) => api.get(`movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
const getUpcomingMovies = () => api.get(`movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
const getMovieImages = (movieId) => api.get(`/movie/${movieId}/images?api_key=${API_KEY}`)
const getMovieRecommendations = (movieId) => api.get(`/movie/${movieId}/recommendations`)

export default {
  getMovies,
  getMoreMovies,
  getMovieById,
  getMovieByQuery,
  getMovieGenres,
  getMovieReviews,
  getUpcomingMovies,
  getMovieImages,
  getMovieRecommendations
}