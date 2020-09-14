import { fork, call, put, take, all } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes/nonBlockingCalls'
import { toast } from 'react-toastify'
import { api } from '../utils'

const API_ENDPOINT_CITIES = 'http://localhost:3000/cities'
const API_ENDPOINT_USERS = 'http://localhost:3000/users'

function* fetchResource(resource: any, successAction: any) {
  try {
    const result = yield call(api(resource))
    yield put({ type: successAction.type, data: result })
    toast.success(successAction.type)
  } catch (e) {
    toast.error('Fail!')
  }
}
function* getUsers() {
  yield take(actionTypes.GET_USERS)
  yield fork(fetchResource, API_ENDPOINT_USERS, { type: actionTypes.GET_USERS_SUCCESS })
}

function* getCities() {
  yield take(actionTypes.GET_CITIES)
  yield fork(fetchResource, API_ENDPOINT_CITIES, { type: actionTypes.GET_CITIES_SUCCESS })
}

export function* runNonBlockingCallsExample() {
  yield all([getUsers(), getCities()])
}
