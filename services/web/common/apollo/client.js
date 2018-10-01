import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import fetch from 'cross-fetch'

const { WEB_HOST, WEB_PORT } = process.env

const API_URI_CLIENT = 'http://graphql.docker.localhost'
const API_URI_SERVER = `http://${WEB_HOST}:${WEB_PORT}`

export function getServerApolloClient(options) {
  const { headers } = options

  const httpLink = new HttpLink({ uri: API_URI_SERVER, fetch })

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

  console.log({ getServerApolloClient: client })

  return client
}

export function getBrowserApolloClient() {
  const httpLink = new HttpLink({ uri: API_URI_CLIENT, fetch })

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

  console.log({ getBrowserApolloClient: client })

  return client
}
