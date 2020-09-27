import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { Provider } from 'react-redux'
import Example from './components/Example'
import { fetchUserEpic } from './actions'
import rootReducer from './reducers'
export const rootEpic = combineEpics(fetchUserEpic)
const epicMiddleware = createEpicMiddleware()
const store = createStore(rootReducer, applyMiddleware(epicMiddleware, logger))

// @ts-ignore
epicMiddleware.run(rootEpic)
ReactDOM.render(
  <Provider store={store}>
    <Example />
  </Provider>,
  document.getElementById('root'),
)
