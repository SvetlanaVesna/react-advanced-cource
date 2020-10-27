import React from 'react'
import ReactDOM from 'react-dom'

import NameForm from './containers/simpleForm/Uncontrolled'
import ReactHooksForm from './containers/reactHooksForm/index'

import './index.css'

const App = () => {
  return (
    <>
      <NameForm />
      <h2>via React-hooks-form</h2>
      <ReactHooksForm />
    </>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
