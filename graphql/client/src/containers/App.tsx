import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  NormalizedCacheObject,
} from '@apollo/client'
import routes from './route'

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjp0qwlmefpf40186p5f2pi4s',
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link,

  headers: {
    authorization: localStorage.getItem('token') || '',
    'client-name': 'Books Explorer [web]',
    'client-version': '1.0.0',
  },
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>{routes}</BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default App
