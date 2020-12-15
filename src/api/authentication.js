import axios from './axiosInstance'

 const getRequestToken = () => axios.get(`/authentication/token/new`)

 const login = (username, password, requestToken) => {
  axios.post('/authentication/token/validate_with_login', {
    username: username,
    password: password,
    request_token: requestToken
  })
}

 const createSession = (requestToken) => {
  axios.post('/authentication/session/new', {
    request_token: requestToken
  })
}

const getAccount = (sessionId) => {
  axios.post(`/account?session_id=${sessionId}`)
}

 const deleteSession = (sessionId) => {
  axios.delete('/authentication/session', {session_id: sessionId})
}

export default { getRequestToken, login, createSession, getAccount, deleteSession }