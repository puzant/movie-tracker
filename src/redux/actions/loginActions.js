import { createAction } from 'redux-actions';
import * as actions from './actionTypes'
import auth from '../../api/authentication'

/*
 |--------------------------------------------------------------------------
 | Login User
 |--------------------------------------------------------------------------
 */

const login = createAction(actions.LOGIN)
const authSuccess = createAction(actions.LOGIN_SUCCESS)

const loginUser = (username, password) => {
  let requestToken, sessionId, accountId
   return async (dispatch) => {

    try {
      dispatch(login)
      const requestTokenResponse = await auth.getRequestToken()
      requestToken = requestTokenResponse.data.request_token  
      dispatch(authSuccess)
    } catch(error) {
      console.log(error)
    }

    try {
     const loginResponse = await auth.login(username, password, requestToken)
    } catch(error) {
      console.log(error)
    }
    
    try {
     const sessionResponse = await auth.createSession(requestToken)  
     sessionId = sessionResponse.data.session_id
    } catch(error) {
      console.log(error)
    }

    try {
      const userAccountResponse = await auth.getAccount(sessionId)
      accountId = userAccountResponse.data.id
    } catch(error) {
      console.log(error)
    }
  }
}

export default {
  loginUser
}