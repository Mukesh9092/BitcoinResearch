import { ApolloClient, createNetworkInterface } from 'react-apollo'

function getApolloClient(headers, initialState) {
  return new ApolloClient({
    initialState,
    ssrMode: !process.browser,
    dataIdFromObject: result => result.id || null,
    networkInterface: createNetworkInterface({
      // TODO: Get this from environment variables.
      uri: '/api/graphql',
      transportBatching: true,
      opts: {
        mode: 'cors',
        // credentials: 'include',
      },
    }),
  })
}

// Cached.
let apolloClient = null

export function initClient(headers, initialState = {}) {
  if (!process.browser) {
    return getApolloClient(headers, initialState)
  }

  if (!apolloClient) {
    apolloClient = getApolloClient(headers, initialState)
  }

  return apolloClient
}
