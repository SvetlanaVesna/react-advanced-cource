import React from 'react'
import UseLayoutEffect from './useLayoutEffect'
import UseImperativeHandle from './useImperativeHandle'

const App = () => {
  return (
    <div>
      <h4>UseImperativeHandle Example:</h4>
      <UseImperativeHandle />
      <h4>UseLayoutEffect Example:</h4>
      <UseLayoutEffect />
    </div>
  )
}
export default App
