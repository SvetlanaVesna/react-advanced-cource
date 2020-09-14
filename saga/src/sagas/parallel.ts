import * as a from 'redux-saga'
import { call, put, takeLatest, all } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes/parallel'
import { toast } from 'react-toastify'
import { api } from '../utils'

console.log(a)

const API_ENDPOINT_CITIES = 'http://localhost:3000/cities'
const API_ENDPOINT_USERS = 'http://localhost:3000/users'

function* getData() {
  const r = yield all([
    call(fetchResource, API_ENDPOINT_USERS, { type: actionTypes.GET_USERS_SUCCESS }),
    call(fetchResource, API_ENDPOINT_CITIES, { type: actionTypes.GET_CITIES_SUCCESS }),
  ])
  console.log(r)
}

function* fetchResource(resource: any, successAction: any) {
  try {
    const result = yield call(api(resource))
    yield put({ type: successAction.type, data: result })
    toast.success(successAction.type)
  } catch (e) {
    toast.error('Fail!')
  }
}

export function* runParallelCallsExample() {
  yield takeLatest(actionTypes.GET_DATA, getData)
}
