import {
  call,
  put,
  takeEvery,
  takeLatest,
  throttle,
  take,
  fork,
  cancel,
} from 'redux-saga/effects'
import * as actionTypes from '../actionTypes/basic'
import * as actionCreators from '../actionCreators/basic'
import { toast } from 'react-toastify'
import { api } from '../utils'

export function* getUsers() {
  try {
    const users = yield call(api, 'http://localhost:3000/users')
    yield put(actionCreators.getUsersSuccess(users))
    toast.success('Users loaded!')
  } catch (error) {
    yield put(actionCreators.getUsersError(error))
    toast.error('Fail!')
  }
}

export function* getUsersTakeEvery() {
  yield takeEvery(actionTypes.GET_USERS_E, getUsers)
}

export function* getUsersTakeLatest() {
  yield takeLatest(actionTypes.GET_USERS_L, getUsers)
}

export function* getUsersThrottle() {
  yield throttle(5000, actionTypes.GET_USERS_T, getUsers)
}
export function* userWatcher() {
  while (yield take(actionTypes.GET_USERS_W)) {
    const bgSyncTask = yield fork(getUsers)
    yield take(actionTypes.GET_USERS_C)
    yield cancel(bgSyncTask)
  }
}
