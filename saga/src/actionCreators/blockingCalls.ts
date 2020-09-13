import * as actionTypes from '../actionTypes/blockingCalls'

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

export function getCitiesSuccess(comments: any) {
  return { type: actionTypes.GET_CITIES_SUCCESS, comments }
}

export function getCitiesError(error: any) {
  return { type: actionTypes.ERROR, error }
}
