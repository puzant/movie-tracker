import axios from './axiosInstance'

const getRequestToken = () => axios.get(`/authentication/token/new`)

const login = (username, password, requestToken) => {
  return axios.post('/authentication/token/validate_with_login', {
    username: username,
    password: password,
    request_token: requestToken
  })
}

const createSession = (requestToken) => {
  return axios.post('/authentication/session/new', {
    request_token: requestToken
  })
}

const getAccount = (sessionId) => axios.get(`/account?session_id=${sessionId}`)

const deleteSession = (sessionId) => {
  return axios.delete('/authentication/session', {session_id: sessionId})
}

export default { getRequestToken, login, createSession, getAccount, deleteSession }