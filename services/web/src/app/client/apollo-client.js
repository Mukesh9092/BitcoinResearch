import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import fetch from 'cross-fetch'

const API_URI_CLIENT = 'http://graphql.docker.localhost'

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
