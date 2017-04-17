import { ApolloClient, createNetworkInterface } from 'react-apollo'

let apolloClient = null

function _initClient(headers, initialState) {
  return new ApolloClient({
    initialState,
    ssrMode: !process.browser,
    dataIdFromObject: result => result.id || null,
    networkInterface: createNetworkInterface({
    })
  })
}
