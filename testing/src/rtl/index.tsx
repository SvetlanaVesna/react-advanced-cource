import React from 'react'
import { render } from 'react-dom'

function App() {
  return (
    <div>
      <h1>
        react-testing-library examples
        <span role="img" aria-label="goat">
          🐐
        </span>
      </h1>
      <div>
        <p>
          This is an example project of how to test react components using
          react-testing-library and Jest.
        </p>
      </div>
    </div>
  )
}

render(<App />, document.getElementById('root'))
