import { handleActions } from 'redux-actions';


export const initialState = {
  isAuth: false,
  loginSuccess: false,
  accountId: null,
  sessionId: null
}

const loginActionsHandler = {}

export default handleActions(loginActionsHandler, initialState)
