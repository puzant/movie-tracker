import axios from './axiosInstance'

export const getMovies = () => axios.get(`discover/movie`)
export const getMoreMovies = (pageNumber: number) => axios.get(`discover/movie`,  {params: {page: pageNumber} })

export const getMovieById = (movieId: string) => axios.get(`movie/${movieId}`, {
  params: {
    append_to_response: 'credits,keyword,recommendations',
  }
})

export const getMovieByQuery = (queryParam: string) => axios.get(`/search/movie`, {
  params: { query: queryParam }
})

export const getMovieGenres = () => axios.get(`genre/movie/list`)
export const getMovieReviews = (movieId: string) => axios.get(`movie/${movieId}/reviews`)
export const getUpcomingMovies = () => axios.get(`movie/upcoming`)
export const getMovieImages = (movieId: string) => axios.get(`/movie/${movieId}/images`)
export const getMovieRecommendations = (movieId: string) => axios.get(`/movie/${movieId}/recommendations`)

export const rateMovie = (id: string, rating: number, sessionId: string) => 
  axios.post(`/movie/${id}/rating?session_id=${sessionId}`, { value: rating });

export const deleteMovieRating = (id: string, sessionId: string) => 
  axios.delete(`/movie/${id}/rating?session_id=${sessionId}`);
