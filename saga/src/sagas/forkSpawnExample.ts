import { fork, call, put, spawn, delay, takeEvery, all } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes/forkSpawnExample'

const API_ENDPOINT_COMMENTS = 'http://localhost:3000/comments'
const API_ENDPOINT_USERS = 'http://localhost:3000/users'

function* fetchAllWithFork() {
  yield fork(fetchResource, API_ENDPOINT_USERS, {
    type: actionTypes.GET_USERS_SUCCESS,
  })
  yield fork(fetchResource, API_ENDPOINT_COMMENTS, {
    type: actionTypes.GET_COMMENTS_SUCCESS,
  })
  yield call(delay, 500)
}

//spawn runs independently, hence error do not bubble up to parent in this case.
function* fetchAllWithSpwan() {
  yield spawn(fetchResource, API_ENDPOINT_USERS, {
    type: actionTypes.GET_USERS_SUCCESS,
  })
  yield spawn(fetchResource, API_ENDPOINT_COMMENTS, {
    type: actionTypes.GET_COMMENTS_SUCCESS,
  })
  yield call(delay, 500)
}

function* fetchResource(resource: any, successAction: any) {
  const data = yield call(() => fetch(resource).then(r => r.json()))
  successAction.data = data
  console.log(successAction)
  yield put(successAction)
}

function* mainFork() {
  try {
    yield call(fetchAllWithFork)
  } catch (error) {
    yield put({ type: actionTypes.ERROR, error })
  }
}

function* mainSpawn() {
  try {
    yield call(fetchAllWithSpwan)
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
