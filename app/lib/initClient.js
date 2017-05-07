import { ApolloClient, createNetworkInterface } from 'react-apollo'

let apolloClient = null

function getApolloClient(headers, initialState) {
  return new ApolloClient({
    initialState,
    ssrMode: !process.browser,
    dataIdFromObject: result => result.id || null,
    networkInterface: createNetworkInterface({
      // TODO: Get this from environment variables.
      uri: 'http://0.0.0.0:3001/graphql',
      opts: {
        credentials: 'include',
        // Pass headers here if your graphql server requires them
      },
    }),
  })
}

export function initClient(headers, initialState = {}) {
  if (!process.browser) {
    return getApolloClient(headers, initialState)
  }

  if (!apolloClient) {
    apolloClient = getApolloClient(headers, initialState)
  }

  return apolloClient
}
