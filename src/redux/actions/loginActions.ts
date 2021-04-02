import { createAction } from 'redux-actions'
import auth from '../../api/authentication'
import { LOGIN_ACTIONS } from '../actionTypes/loginActionTypes'
/*
 |--------------------------------------------------------------------------
 | Login User
 |--------------------------------------------------------------------------
 */

const loginSuccess = createAction(LOGIN_ACTIONS.LOGIN_SUCCESS)
const loginFailure = createAction(LOGIN_ACTIONS.LOGIN_FAILURE)

const loginUser = (username: string, password: string) => {
  let requestToken: null, 
      sessionId: null, 
      accountId: null
  return async (dispatch: any) => {

    try {
      const requestTokenResponse = await auth.getRequestToken()
      requestToken = requestTokenResponse.data.request_token  
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