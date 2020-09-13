import React from 'react'
import { useDispatch } from 'react-redux'

import * as sagaHelpersExampleActions from './actionCreators/sagaHelpers'
import * as forkSpawnExampleActionCreators from './actionCreators/forkSpwanExample'
import * as nonBlockingCallsExampleActionCreators from './actionCreators/nonBlockingCalls'
import * as blockingCallsExampleActionCreators from './actionCreators/blockingCalls'
import * as parallelCallsExampleActionCreators from './actionCreators/parallel'

const App = () => {
  const dispatch = useDispatch()

  return (
    <div className="App">
      <div className="App-header">
        <h2>Redux Saga Examples</h2>
      </div>
      <fieldset>
        <legend>Saga Helpers</legend>
        <button onClick={() => dispatch(sagaHelpersExampleActions.getUsersE())}>
          takeEvery
        </button>
        <button onClick={() => dispatch(sagaHelpersExampleActions.getUsersL())}>
          takeLatest
        </button>
        <button onClick={() => dispatch(sagaHelpersExampleActions.getUsersT())}>
          throttle
        </button>
      </fieldset>
      <fieldset>
        <legend>Saga Effects - Fork & Spawn</legend>
        <button onClick={() => dispatch(forkSpawnExampleActionCreators.runForkExample())}>
          Fork Example
        </button>
        <button
          onClick={() => dispatch(forkSpawnExampleActionCreators.runSpawnExample())}
        >
          Spawn Example
        </button>
      </fieldset>
      <fieldset>
        <legend>Saga Effects - Non-Blocking calls</legend>
        <button
          onClick={() => dispatch(nonBlockingCallsExampleActionCreators.getUsers())}
        >
          Get Users
        </button>
        <button
          onClick={() => dispatch(nonBlockingCallsExampleActionCreators.getCities())}
        >
          Get Cities
        </button>
      </fieldset>
      <fieldset>
        <legend>Saga Effects - Blocking calls</legend>
        <button onClick={() => dispatch(blockingCallsExampleActionCreators.getUsers())}>
          Get Users
        </button>
        <button onClick={() => dispatch(blockingCallsExampleActionCreators.getCities())}>
          Get Cities
        </button>
      </fieldset>
      <fieldset>
        <legend>Saga Effects - Parallel calls</legend>
        <button onClick={() => dispatch(parallelCallsExampleActionCreators.getData())}>
          Get Data
        </button>
      </fieldset>
    </div>
  )
}
export default App