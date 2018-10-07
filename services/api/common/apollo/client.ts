import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import fetch from 'cross-fetch'

const { GRAPHQL_HOST, GRAPHQL_PORT } = process.env

const API_URI_CLIENT = 'http://graphql.docker.localhost'
const API_URI_SERVER = `http://${GRAPHQL_HOST}:${GRAPHQL_PORT}`

type getServerApolloClientOptions = {
  headers: {}
}

export function getServerApolloClient(options: getServerApolloClientOptions = { headers: {} }) {
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
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

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
    link: authLink.concat(httpLink),

    // @ts-ignore
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  })

  return client
}
