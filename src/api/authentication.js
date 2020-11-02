import axios from 'axios'

export const getRequestToken = () => axios.get(`/authentication/token/new`)

export const login = (username, password, requestToken) => {
  axios.post('/authentication/token/validate_with_login', {
    username,
    password,
    request_token: requestToken
  })
}

