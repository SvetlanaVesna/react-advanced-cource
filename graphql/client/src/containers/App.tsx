import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  NormalizedCacheObject,
  split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { getMainDefinition } from '@apollo/client/utilities'

import { OperationDefinitionNode } from 'graphql'
import routes from './route'

const cache = new InMemoryCache()
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/',
})

const subscriptionClient = new SubscriptionClient('ws://localhost:4000/graphql', {
  reconnect: true,
})

const wsLink = new WebSocketLink(subscriptionClient)
// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent

const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
)

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
