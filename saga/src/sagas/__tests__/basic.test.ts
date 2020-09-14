import { call } from 'redux-saga/effects'
import { getUsers } from '../basic'
import { api } from '../../utils'
describe('test basic saga', () => {
  test('test call effect', () => {
    const iterator = getUsers()
    expect(JSON.stringify(iterator.next().value)).toEqual(
      JSON.stringify(call(api, 'http://localhost:3000/users?_page=1&limit=20')),
    )
  })
})
