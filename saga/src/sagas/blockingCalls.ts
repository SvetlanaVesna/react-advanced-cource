import { call, fork, put, take, all } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes/blockingCalls'

const API_ENDPOINT_CITIES = 'http://localhost:3000/cities'
const API_ENDPOINT_USERS = 'http://localhost:3000/users'

function* fetchResource(resource: any, successAction: any) {
  const result = yield call(async () => {
    const data = await fetch(resource)
    return data.json()
  })
  yield put({ type: successAction.type, data: result })
}

function* getData() {
  yield take(actionTypes.GET_USERS)
  yield fork(fetchResource, API_ENDPOINT_USERS, { type: actionTypes.GET_USERS_SUCCESS })
  yield take(actionTypes.GET_CITIES)
  yield fork(fetchResource, API_ENDPOINT_CITIES, { type: actionTypes.GET_CITIES_SUCCESS })
}

export function* runBlockingCallsExample() {
  yield all([getData()])
}
