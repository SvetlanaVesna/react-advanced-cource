import React from 'react'

import FormikWithHook from './FormikWithHook'
import FormikWithoutHook from './FormikWithoutHook'
const App = () => {
  return (
    <>
      <h4>Formik with hook</h4>
      <FormikWithHook />
      <h4>Formik Without Hook</h4>
      <FormikWithoutHook />
    </>
  )
}

export default App
