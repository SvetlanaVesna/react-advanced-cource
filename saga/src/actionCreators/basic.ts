import * as actionTypes from '../actionTypes/basic'
import { Dispatch } from 'redux'

export function getUsers() {
  return { type: actionTypes.GET_USERS }
}
export function getUsersE() {
  return { type: actionTypes.GET_USERS_E }
}

export function getUsersL() {
  return { type: actionTypes.GET_USERS_L }
}

export function getUsersT() {
  return { type: actionTypes.GET_USERS_T }
}

export function getUsersSuccess(users: any) {
  return { type: actionTypes.GET_USERS_SUCCESS, users }
}

export function getUsersError(error: any) {
  return { type: actionTypes.ERROR, error }
}

export const getUsersAsync = () => {
  return (dispatch: Dispatch) => {
    dispatch(getUsers())
    return fetch('http://localhost:3000/users')
      .then(res => {
        const data = res.json()
        dispatch(getUsersSuccess(data))
        return res
      })
      .catch(error => {
        dispatch(getUsersError(error))
        return error
      })
  }
}
