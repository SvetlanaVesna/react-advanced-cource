import { call, fork, put, take } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import * as actionTypes from '../actionTypes/blockingCalls'
import { api } from '../utils'

const API_ENDPOINT_CITIES = 'http://localhost:3000/cities'
const API_ENDPOINT_USERS = 'http://localhost:3000/users'

function* fetchResource(resource: any, successAction: any) {
  try {
    const result = yield call(api, resource)
    yield put({ type: successAction.type, data: result })
    toast.success(successAction.type)
  } catch (e) {
    toast.error('Fail!')
  }
}

function* getData() {
  yield take(actionTypes.GET_USERS)
  yield fork(fetchResource, API_ENDPOINT_USERS, { type: actionTypes.GET_USERS_SUCCESS })
  yield take(actionTypes.GET_CITIES)
  yield fork(fetchResource, API_ENDPOINT_CITIES, { type: actionTypes.GET_CITIES_SUCCESS })
}

export function* runBlockingCallsExample() {
  yield getData()
}
