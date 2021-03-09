import { handleActions } from 'redux-actions';


export const initialState = {
  isAuth: false,
  loginSuccess: false,
  loginError: false,
  accountId: null,
  sessionId: null
}

const loginActionsHandler = {}

export default handleActions(loginActionsHandler, initialState)
