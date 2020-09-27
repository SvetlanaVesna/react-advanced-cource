import * as Rx from 'rxjs'
import { switchMap, delay, map, takeUntil, startWith } from 'rxjs/operators'
import { ActionsObservable, ofType } from 'redux-observable'

export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_PENDING = 'FETCH_USER_PENDING'
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED'
export const FETCH_USER_ABORTED = 'FETCH_USER_ABORTED'

let id = 0

export const fetchUserEpic = (action$: ActionsObservable<any>) =>
  action$.pipe(
    ofType(FETCH_USER),
    switchMap(() =>
      Rx.of({ id: ++id, name: `User №${id}`, timestamp: new Date() }).pipe(
        delay(2000),
        map(payload => createFetchUserFulfilledAction(payload)),
        takeUntil(action$.pipe(ofType(FETCH_USER_ABORTED))),
        startWith({ type: FETCH_USER_PENDING }),
      ),
    ),
  )

// action creators
export const createFetchUserAction = (username: string) => ({
  type: FETCH_USER,
  payload: username,
})
export const createFetchUserFulfilledAction = (payload: {
  id: number
  name: string
  timestamp: Date
}) => ({
  type: FETCH_USER_FULFILLED,
  payload,
})
export const createAbortFetchUserAction = () => ({ type: FETCH_USER_ABORTED })
