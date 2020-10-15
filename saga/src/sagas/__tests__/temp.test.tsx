import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from "jest-fetch-mock"

import * as actions from '../../actionCreators/basic'
const middleware = [thunk]
const mockStore = configureMockStore(middleware)


const store = mockStore()
describe('getTodos actions', () => {
  beforeEach(() => {
    store.clearActions()
  })
  test('dispatches GET_TODO_SUCCESS after a successfull API requets', () => {
    fetchMock.mockResponseOnce(JSON.stringify([{ item: 'item1' }, { item: 'item2' }]))
    store.dispatch(actions.getUsersAsync()).then(() => {
      let expectedActions = [
        { type: 'GET_USERS' },
        { type: 'GET_USERS_SUCCESS', users: [{ item: 'item1' }, { item: 'item2' }] },
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  test('dispatches GET_TODO_FAILURE after a FAILED API requets', () => {
    fetchMock.mockRejectedValue({ error: { message: 'error message' } })
    store.dispatch(actions.getUsersAsync()).then(() => {
      let expectedActions = [
        { type: 'GET_USERS' },
        { type: 'GET_USERS_ERROR', payload: { error: { message: 'error message' } } },
      ]
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

import reducer from '../../reducers/basic';
import * as actions from '../../actionTypes/basic';
import * as data from '../../../db.json'


describe('users reducer', () => {
  it('should handle GET_USERS', () => {
    const startAction = {
      type: actions.GET_USERS
    };
    expect(reducer({}, startAction)).toEqual({});
  });

  it('should handle GET_USERS_SUCCESS', () => {
    const successAction = {
      type: actions.GET_USERS_SUCCESS,
      users: data.users,
    };
    expect(reducer({}, successAction)).toEqual(data.users);
  });
});

const thunk = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState)
  }

  return next(action)
}
const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn()
  }
  const next = jest.fn()

  const invoke = action => thunk(store)(next)(action)

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
  invoke((dispatch, getState) => {
    dispatch('TEST DISPATCH')
    getState()
  })
  expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH')
  expect(store.getState).toHaveBeenCalled()
})