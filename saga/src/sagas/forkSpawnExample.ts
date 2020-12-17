import { fork, call, put, spawn, delay, takeEvery, all } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes/forkSpawnExample'
import { toast } from 'react-toastify'
import { api } from '../utils'

const API_ENDPOINT_USERS = 'http://localhost:3000/users'

function* fetchAllWithFork() {
  console.log('Fork start')
  yield fork(fetchResource, API_ENDPOINT_USERS, {
    type: actionTypes.GET_USERS_SUCCESS,
  })
  console.log('Fork end')
}

//spawn runs independently, hence error do not bubble up to parent in this case.
function* fetchAllWithSpwan() {
  console.log('Spawn start')
  yield spawn(fetchResource, API_ENDPOINT_USERS, {
    type: actionTypes.GET_USERS_SUCCESS,
  })
  console.log('Spawn end')
}

function* fetchResource(resource: any, successAction: any) {
  console.log('fetch started')
  try {
    const result = yield call(api, resource)
    yield put({ type: successAction.type, data: result })
    toast.success(successAction.type)
  } catch (e) {
    toast.error('Fail!')
  }
  yield delay(1000)
  console.log('fetch finished')
}

function* mainFork() {
  console.log('Main start')
  try {
    yield call(fetchAllWithFork)
  } catch (error) {
    yield put({ type: actionTypes.ERROR, error })
  }
  console.log('Main end')
}

function* mainSpawn() {
  console.log('Main start')
  try {
    yield call(fetchAllWithSpwan)
  } catch (error) {
    yield put({ type: actionTypes.ERROR, error })
  }
  console.log('Main end')
}

export function* forkSpawnExampleMain() {
  yield all([
    takeEvery('RUN_FORK_EXAMPLE', mainFork),
    takeEvery('RUN_SPAWN_EXAMPLE', mainSpawn),
  ])
}
