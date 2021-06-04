import { createAction } from 'redux-actions'
import { getRequestToken, login, createSession, getAccount, deleteSession } from 'api'
import authActionTypes from '../actionTypes/authActionTypes'

/*
  |--------------------------------------------------------------------------
  | Login User
  |--------------------------------------------------------------------------
 */

const loginSuccess = createAction(authActionTypes.LOGIN_SUCCESS, (sessionId: string, accountId: string) => ({ sessionId, accountId }))
const loginFailure = createAction(authActionTypes.LOGOUT_FAILURE, (error: any) => (error))

const loginUser = (username: string, password: string) => {
  let requestToken: string, 
      sessionId: string, 
      accountId: string
  return async (dispatch: any) => {
    try {
      const requestTokenResponse = await getRequestToken()
      requestToken = requestTokenResponse.data.request_token  
    } catch(error) {
    }

    try {
      const loginResponse = await login(username, password, requestToken)
    } catch(error) {
      dispatch(loginFailure(error))
    }
    
    try {
      const sessionResponse = await createSession(requestToken)  
      sessionId = sessionResponse.data.session_id
      localStorage.setItem('sessionId', sessionId)
    } catch(error) {
    }

    try {
      const userAccountResponse = await getAccount(sessionId)
      accountId = userAccountResponse.data.id
      localStorage.setItem('accountId', accountId)
      dispatch(loginSuccess(accountId, sessionId))
    } catch(error) {
    }

  }
}

/*
  |--------------------------------------------------------------------------
  | Logout User
  |--------------------------------------------------------------------------
 */

const logoutEvent = createAction(authActionTypes.LOGOUT)
const logoutFailure = createAction(authActionTypes.LOGOUT_FAILURE, (error: any) => (error))

const logout = () => {
  return async (dispatch: any) => {
    try {
      localStorage.removeItem('sessionId')
      localStorage.removeItem('accountId')
      dispatch(logoutEvent)
    } catch (error) {
      dispatch(logoutFailure)
    }
  }
}

export default {
  loginUser,
  logout
}