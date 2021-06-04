import axios from '../axiosInstance'

export const getFavoriteMovies = (
  accountId: string,
  sessionId: string
) => 
  axios.get(`/account/${accountId}/favorite/movies`, {
    params: { session_id: sessionId }
  })

export const getFavoriteTvShow = (
  accountId: string,
  sessionId: string
) => 
  axios.get(`/account/${accountId}/favorite/tv`, {
    params: { session_id: sessionId }
  })

export const getWatchlistMovies = (
  sessionId: string,
  accountId: string,
) =>
  axios.get(`/account/${accountId}/watchlist/movies`, {
    params: { session_id: sessionId },
  });

export const getWatchlistTvShows = (
  sessionId: string,
  accountId: string,
) => 
  axios.get(`/account/${accountId}/watchlist/tv`, {
    params: { session_id: sessionId },
  })