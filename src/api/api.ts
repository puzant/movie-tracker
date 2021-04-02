import axios from './axiosInstance'

const getMovies = () => axios.get(`discover/movie`)
const getMoreMovies = (pageNumber: number) => axios.get(`discover/movie`,  {params: {page: pageNumber} })

const getMovieById = (movieId: string) => axios.get(`movie/${movieId}`, {
  params: {
    append_to_response: 'credits,keyword,recommendations',
  }
})

const getMovieByQuery = (queryParam: string) => axios.get(`/search/movie`, {
  params: { query: queryParam }
})

const getMovieGenres = () => axios.get(`genre/movie/list`)
const getMovieReviews = (movieId: string) => axios.get(`movie/${movieId}/reviews`)
const getUpcomingMovies = () => axios.get(`movie/upcoming`)
const getMovieImages = (movieId: string) => axios.get(`/movie/${movieId}/images`)
const getMovieRecommendations = (movieId: string) => axios.get(`/movie/${movieId}/recommendations`)

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