import configureMockStore from 'redux-mock-store'
import reduxThunk from 'redux-thunk'
import fetchMock from 'jest-fetch-mock'
import reducer from '../reducers/basic'
import * as data from '../../db.json'

import * as actions from '../actionCreators/basic'
import * as actionTypes from '../actionTypes/basic'
import { Action, Dispatch } from 'redux'
const middleware = [reduxThunk]
const mockStore = configureMockStore(middleware)

const store = mockStore()
describe('getUsers actions', () => {
  beforeEach(() => {
    store.clearActions()
    fetchMock.resetMocks()
    fetchMock.doMock()
  })

  test('dispatches GET_USERS_SUCCESS after a successfull API requets', () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ item: 'item1' }, { item: 'item2' }]))
    // @ts-ignore
    store.dispatch(actions.getUsersAsync()).then(() => {
      let expectedActions = [
        { type: 'basic/GET_USERS' },
        { type: 'GET_USERS_SUCCESS', users: [{ item: 'item1' }, { item: 'item2' }] },
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  test('dispatches GET_USERS_ERROR after a FAILED API requets', () => {
    fetchMock.mockRejectedValue({ error: { message: 'error message' } })
    // @ts-ignore
    store.dispatch(actions.getUsersAsync()).then(() => {
      let expectedActions = [
        { type: 'basic/GET_USERS' },
        {
          type: 'basic/GET_USERS_ERROR',
          payload: { error: { message: 'error message' } },
        },
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('users plain actions', () => {
  test('getUsers(): should create an action', () => {
    const expectedAction = { type: actionTypes.GET_USERS }
    expect(actions.getUsers()).toEqual(expectedAction)
  })
})
describe('users reducer', () => {
  it('should handle GET_USERS', () => {
    const startAction = {
      type: actionTypes.GET_USERS,
    }
    expect(reducer({}, startAction)).toEqual({ isFetching: true })
  })

  it('should handle GET_USERS_SUCCESS', () => {
    const successAction = {
      type: actionTypes.GET_USERS_SUCCESS,
      users: data.users,
    }
    expect(reducer({}, successAction)).toEqual({ isFetching: false, users: data.users })
  })
})

const thunk = ({ dispatch, getState }: { dispatch: Dispatch; getState: Function }) => (
  next: Function,
) => (action: Function | Action) => {
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }

  return next(action)
}
const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  }
  const next = jest.fn()

  const invoke = (action: Function | Action) => thunk(store)(next)(action)

  return { store, next, invoke }
}
it('passes through non-function action', () => {
  const { next, invoke } = create()
  const action = { type: 'TEST' }
  invoke(action)
  expect(next).toHaveBeenCalledWith(action)
})

it('calls the function', () => {
  const { invoke } = create()
  const fn = jest.fn()
  invoke(fn)
  expect(fn).toHaveBeenCalled()
})

it('passes dispatch and getState', () => {
  const { store, invoke } = create()
  invoke((dispatch: Dispatch, getState: Function) => {
    dispatch({ type: 'TEST DISPATCH' })
    getState()
  })
  expect(store.dispatch).toHaveBeenCalledWith({ type: 'TEST DISPATCH' })
  expect(store.getState).toHaveBeenCalled()
})
