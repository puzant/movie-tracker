import { handleActions } from 'redux-actions'
import authActionTypes from '../actionTypes/authActionTypes'

interface State {
  accountId: string | null
  sessionId: string | null
  success: boolean
  error: any
  isAuthenticated: boolean
}

export const initialState: State = {
  accountId: null,
  sessionId: null,
  success: false,
  error: null,
  isAuthenticated: false
}

const loginError = (state: State, error: any) => {
  return ({
    ...state,
    error: error
  })
}

const loginSuccess = (state: State, {payload}: any) => {
  return ({
    ...state,
    accountId: payload.accountId,
    sessionId: payload.sessionId,
    success: true,
    isAuthenticated: true
  })
}

const initiateLogout = (state: any) => {
  return ({
    ...state,
    isAuthenticated: false,
  })
}

const logoutError = (state: any) => {
  
}

const authActionsHandler = {
  [authActionTypes.LOGOUT_FAILURE]: loginError,
  [authActionTypes.LOGIN_SUCCESS]: loginSuccess,
  [authActionTypes.LOGOUT]: initiateLogout,
  [authActionTypes.LOGOUT_FAILURE]: logoutError
}

export default handleActions(authActionsHandler, initialState)
