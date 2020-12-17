import { fork, call, put, spawn, delay, takeEvery, all } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes/forkSpawnExample'
import { toast } from 'react-toastify'
import { api } from '../utils'

const API_ENDPOINT_COMMENTS = 'http://localhost:3000/comments'
const API_ENDPOINT_USERS = 'http://localhost:3000/users'

function* fetchAllWithFork() {
  yield fork(fetchResource, API_ENDPOINT_USERS, {
    type: actionTypes.GET_USERS_SUCCESS,
  })
  yield fork(fetchResource, API_ENDPOINT_COMMENTS, {
    type: actionTypes.GET_CITIES_SUCCESS,
  })
  yield delay(500)
}

//spawn runs independently, hence error do not bubble up to parent in this case.
function* fetchAllWithSpawn() {
  yield spawn(fetchResource, API_ENDPOINT_USERS, {
    type: actionTypes.GET_USERS_SUCCESS,
  })
  yield spawn(fetchResource, API_ENDPOINT_COMMENTS, {
    type: actionTypes.GET_CITIES_SUCCESS,
  })
  yield delay(500)
}

function* fetchResource(resource: any, successAction: any) {
  try {
    yield delay(2000)
    const result = yield call(api, resource)
    yield put({ type: successAction.type, data: result })
    toast.success(successAction.type)
  } catch (e) {
    toast.error('Fail!')
  }
}

function* mainFork() {
  try {
    yield call(fetchAllWithFork)
    toast.success("fetchAllWithFork finished")
  } catch (error) {
    yield put({ type: actionTypes.ERROR, error })
  }
}

function* mainSpawn() {
  try {
    yield call(fetchAllWithSpawn)
    toast.success("fetchAllWithSpawn finished")
  } catch (error) {
    yield put({ type: actionTypes.ERROR, error })
  }
}

export function* forkSpawnExampleMain() {
  yield all([
    takeEvery('RUN_FORK_EXAMPLE', mainFork),
    takeEvery('RUN_SPAWN_EXAMPLE', mainSpawn),
  ])
}
