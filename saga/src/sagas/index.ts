import { all } from 'redux-saga/effects'

import { forkSpawnExampleMain } from './forkSpawnExample'
import { runNonBlockingCallsExample } from './nonBlockingCalls'
import { runBlockingCallsExample } from './blockingCalls'
import {
  getUsersTakeEvery,
  getUsersTakeLatest,
  getUsersThrottle,
  userWatcher,
} from './basic'
import { runParallelCallsExample } from './parallel'

export default function* rootSaga() {
  yield console.log('Hello Sagas!')
  yield all([
    forkSpawnExampleMain(),
    runNonBlockingCallsExample(),
    runBlockingCallsExample(),
    getUsersTakeLatest(),
    getUsersTakeEvery(),
    getUsersThrottle(),
    userWatcher(),
    runParallelCallsExample(),
  ])
}
