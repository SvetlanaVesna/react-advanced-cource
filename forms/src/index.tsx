import React from 'react'
import ReactDOM from 'react-dom'

import NameForm from './containers/simpleForm/Uncontrolled'
import ReactHooksForm from './containers/reactHooksForm/index'
import Formik from './containers/formik'

import './index.css'

const App = () => {
  return (
    <>
      <NameForm />
      <h2>via React-hooks-form</h2>
      <ReactHooksForm />
      <h2>Formik</h2>
      <Formik />
    </>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
