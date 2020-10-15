import { switchMap, map, takeUntil, startWith, delay } from 'rxjs/operators'
import {  ofType } from 'redux-observable'
import { Observable } from 'rxjs'

export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_PENDING = 'FETCH_USER_PENDING'
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED'
export const FETCH_USER_ABORTED = 'FETCH_USER_ABORTED'

export const fetchUserEpic = (
  action$: Observable<any>,
  _: null,
  { getJSON }: { getJSON:(url: string, headers?: Object)=> Observable<any> },
) =>
  action$.pipe(
    ofType(FETCH_USER),
    switchMap(() =>
      getJSON('http://localhost:3000/users/1').pipe(
        delay(2000),
        map((payload: any) => createFetchUserFulfilledAction(payload)),
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
export const createFetchUserFulfilledAction = (payload: any) => ({
  type: FETCH_USER_FULFILLED,
  payload,
})
export const createAbortFetchUserAction = () => ({ type: FETCH_USER_ABORTED })
