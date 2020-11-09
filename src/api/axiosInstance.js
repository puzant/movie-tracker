import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_TMDB_API_BASE_URL,
});

//  add the API_KEY with every request
axiosInstance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: process.env.REACT_APP_API_KEY
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export default axiosInstance