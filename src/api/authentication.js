import axios from './axiosInstance'

export const getRequestToken = () => axios.get(`/authentication/token/new`)

export const login = (username, password, requestToken) => {
  axios.post('/authentication/token/validate_with_login', {
    username: username,
    password: password,
    request_token: requestToken
  })
}

export const createSession = (requestToken) => {
  axios.post('/authentication/session/new', {
    request_token: requestToken
  })
}

export const deleteSession = (sessionId) => {
  axios.delete('/authentication/session', {session_id: sessionId})
}