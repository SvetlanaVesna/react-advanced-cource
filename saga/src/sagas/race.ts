import { call, put, race, take, delay } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes/race'
import { toast } from 'react-toastify'
import { api } from '../utils'
const API_ENDPOINT_USERS = 'http://localhost:3000/users'

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

function* backgroundTask() {
  yield call(fetchResource, API_ENDPOINT_USERS, { type: actionTypes.GET_DATA_RACE_SUCCESS })
}

export function* getDataRace() {
  while (true) {
    yield take(actionTypes.GET_DATA_RACE)
    yield race({
      task: call(backgroundTask),
      cancel: take(actionTypes.CANCEL_TASK)
    })
  }
}
