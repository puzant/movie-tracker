import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_TMDB_API_BASE_URL,
});

//  attach the API_KEY with every request
axiosInstance.interceptors.request.use((config: any) => {
  config.params = {
    ...config.params,
    api_key: process.env.REACT_APP_API_KEY
  }
  return config
}, (error: any) => {
  return Promise.reject(error)
})

// https://stackoverflow.com/questions/60293587/change-axios-response-schema
axiosInstance.interceptors.response.use((response: any) => {
  return response.data
})

export default axiosInstance