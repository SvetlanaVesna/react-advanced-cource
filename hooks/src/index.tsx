import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Router, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import UseLayout from './hometask/UseLayout'
import UseRefPage from './classwork/useRef'
import LifecyclePage from './classwork/lifecycle'

const App = () => (
  <Router history={createBrowserHistory()}>
    <nav>
      <ul>
        <li>
          <Link to="/useLayout">Home Task - useLayout</Link>
        </li>
        <li>
          <Link to="/useRef">useRef examples</Link>
        </li>
        <li>
          <Link to="/lifecycle">Lifecycle Examples</Link>
        </li>
      </ul>
    </nav>
    <Switch>
      <Route path="/useLayout">
        <UseLayout />
      </Route>
      <Route path="/useRef">
        <h4>Use Ref Example:</h4>
        <UseRefPage />
      </Route>
      <Route path="/lifecycle">
        <h4>Lifecycle Example:</h4>
        <LifecyclePage />
      </Route>
    </Switch>
  </Router>
)
ReactDOM.render(<App />, document.getElementById('root'))
