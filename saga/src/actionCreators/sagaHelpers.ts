import * as actionTypes from '../actionTypes/sagaHelpers'

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
