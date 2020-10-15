import { of } from 'rxjs'
import { fetchUserEpic } from '../index'
import * as data from '../../../db.json'

describe('', () => {
  test('test fetching users', () => {
    const action$ = of({ type: 'FETCH_USER' })
    const state$ = null // not needed for this epic
    const dependencies = {
      getJSON: () => of(data.users),
    }

    const result$ = fetchUserEpic(action$, state$, dependencies)

    result$.subscribe(actions => {
      expect(actions).toEqual([
        {
          type: 'FETCH_USER_FULFILLED',
          payload: data.users,
        },
      ])
    })
  })
})
