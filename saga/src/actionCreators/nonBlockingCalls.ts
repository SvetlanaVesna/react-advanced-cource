import * as actionTypes from '../actionTypes/nonBlockingCalls'

export function getUsers() {
  return { type: actionTypes.GET_USERS }
}

export function getUsersSuccess(users: any) {
  return { type: actionTypes.GET_USERS_SUCCESS, users }
}

export function getUsersError(error: any) {
  return { type: actionTypes.ERROR, error }
}

export function getCities() {
  return { type: actionTypes.GET_CITIES }
}

export function getCommentsSuccess(comments: any) {
  return { type: actionTypes.GET_CITIES_SUCCESS, comments }
}

export function getCommentsError(error: any) {
  return { type: actionTypes.ERROR, error }
}
