import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'
import 'isomorphic-fetch'

import { log } from '../log'

export function getBrowserApolloClient() {
  const httpLink = new HttpLink({ uri: 'http://api.docker.localhost/graphql' })

  const authLink = setContext((_, props) => {
    return {
      headers: {
        ...props.headers,
      },
    }
  })

  const client = new ApolloClient({
    shouldBatch: true,
    link: authLink.concat(httpLink),
    initialState: window.__APOLLO_STATE__,
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  })

  log.debug({ getBrowserApolloClient: client })

  return client
}

export function getServerApolloClient(options) {
  const { headers } = options

  const { WEB_HOST, WEB_PORT } = process.env

  const httpLink = new HttpLink({
    uri: `http://${WEB_HOST}:${WEB_PORT}/graphql`,
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
    shouldBatch: true,
    link: authLink.concat(httpLink),
    initialState: {},
    cache: new InMemoryCache(),
  })

  log.debug({ getServerApolloClient: client })

  return client
}

export function getApolloClient(options = { isServer: false, headers: {} }) {
  if (options.isServer) {
    return getServerApolloClient({ headers: options.headers })
  }

  return getBrowserApolloClient()
}
