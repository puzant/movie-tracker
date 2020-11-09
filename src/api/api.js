import axios from './axiosInstance'

const getMovies = () => axios.get(`discover/movie`)
const getMoreMovies = (pageNumber) => axios.get(`discover/movie`,  {params: {page: pageNumber} })

const getMovieById = (movieId) => axios.get(`movie/${movieId}`, {
  params: {
    append_to_response: 'credits,keyword,recommendations',
  }
})

const getMovieByQuery = (queryParam) => axios.get(`/search/movie`, {
  params: { query: queryParam }
})

const getMovieGenres = () => axios.get(`genre/movie/list`)
const getMovieReviews = (movieId) => axios.get(`movie/${movieId}/reviews`)
const getUpcomingMovies = () => axios.get(`movie/upcoming`)
const getMovieImages = (movieId) => axios.get(`/movie/${movieId}/images`)
const getMovieRecommendations = (movieId) => axios.get(`/movie/${movieId}/recommendations`)

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