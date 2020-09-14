import { combineReducers } from 'redux'
import sagaHelpersReducer from './basic'
import forkSpawnExampleReducer from './forkSpwanExample'
import nonBlockingCallsExampleReducer from './nonBlockingCalls'
import blockingCallsExampleReducer from './blockingCalls'
import parallelCallsExampleReducer from './parallel'

const reducer = combineReducers({
  sagaHelpersExample: sagaHelpersReducer,
  forkSpawnExample: forkSpawnExampleReducer,
  nonBlockingCallsExample: nonBlockingCallsExampleReducer,
  blockingCallsExample: blockingCallsExampleReducer,
  parallelCallsExample: parallelCallsExampleReducer,
})

export default reducer
