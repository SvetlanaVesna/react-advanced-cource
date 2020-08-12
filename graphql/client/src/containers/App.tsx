import React from 'react'
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
  uri: 'http://localhost:4000/',
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

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>{routes}</BrowserRouter>
    </ApolloProvider>
  )
}

export default App
