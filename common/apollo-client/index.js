import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
// import { SubscriptionClient } from 'subscriptions-transport-ws'
// import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import 'isomorphic-fetch'

import { log } from '../log'

export function getBrowserApolloClient() {
  const httpLink = new HttpLink({ uri: 'http://graphql.docker.localhost' })

  const authLink = setContext((_, props) => {
    return {
      headers: {
        ...props.headers,
      },
    }
  })

  const client = new ApolloClient({
    initialState: window.__APOLLO_STATE__,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  })

  log.debug({ getBrowserApolloClient: client })

  return client
}

export function getServerApolloClient(options) {
  const { headers } = options

  const { API_GRAPHQL_HOST, API_GRAPHQL_PORT } = process.env

  const httpLink = new HttpLink({
    uri: `http://${API_GRAPHQL_HOST}:${API_GRAPHQL_PORT}`,
  })

  const authLink = setContext((_, props) => {
    return {
      headers: {
        ...props.headers,
        ...headers,
      },
    }
  })

  const client = new ApolloClient({
    ssrMode: true,
    initialState: {},
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  log.debug({ getServerApolloClient: client })

  return client
}

export function getApolloClient(options = { isServer: false, headers: {} }) {
  if (isServer) {
    return getServerApolloClient({ headers })
  }

  return getBrowserApolloClient()
}
