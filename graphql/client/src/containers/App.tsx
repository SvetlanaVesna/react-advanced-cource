import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  NormalizedCacheObject,
  ApolloLink,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import routes from './route'

const cache = new InMemoryCache()
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/',
})

const subscriptionClient = new SubscriptionClient('ws://localhost:4000/graphql', {
  reconnect: true,
})

const link = new WebSocketLink(subscriptionClient)

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: ApolloLink.from([link, httpLink]),

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
