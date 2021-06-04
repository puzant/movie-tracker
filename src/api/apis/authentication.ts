import axios from '../axiosInstance'

export const getRequestToken = () => axios.get(`/authentication/token/new`)

export const login = (username: string, password: string, requestToken: string) => {
  return axios.post('/authentication/token/validate_with_login', {
    username: username,
    password: password,
    request_token: requestToken
  })
}

export const createSession = (requestToken: string) => {
  return axios.post('/authentication/session/new', {
    request_token: requestToken
  })
}

export const getAccount = (sessionId: string) => axios.get(`/account?session_id=${sessionId}`)

export const deleteSession = (sessionId: string) => {
  return axios.delete('/authentication/session', {session_id: sessionId})
}
