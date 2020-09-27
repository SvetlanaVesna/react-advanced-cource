import { Action, combineReducers } from 'redux'
import { FETCH_USER_PENDING, FETCH_USER_FULFILLED, FETCH_USER_ABORTED } from '../actions'

// Update the application state based on the given action.
const user = (state = { isLoading: false }, action: Action & { payload: any }) => {
  switch (action.type) {
    case FETCH_USER_PENDING:
      return { ...state, isLoading: true }

    case FETCH_USER_FULFILLED:
      return { ...state, isLoading: false, ...action.payload }

    case FETCH_USER_ABORTED:
      return { ...state, isLoading: false }

    default:
      return state
  }
}

export default combineReducers({ user })
