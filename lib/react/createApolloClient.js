import { ApolloClient, createNetworkInterface } from "react-apollo";
import fetch from "isomorphic-fetch";

const {
  PROXY_HOST,
  PROXY_PORT,
} = process.env

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

let apolloClient = null;

export default function createApolloClient(initialState) {
  if (apolloClient) {
    return apolloClient;
  }

  apolloClient = new ApolloClient({
    initialState,
    // Disables forceFetch on the server (so queries are only run once)
    ssrMode: !process.browser,
    networkInterface: createNetworkInterface({
      // Server URL (must be absolute)
      uri: `http://${PROXY_HOST}:${PROXY_PORT}/api/graphql`,
      opts: {
        // Additional fetch() options like `credentials` or `headers`
        credentials: "same-origin"
      }
    })
  });

  return apolloClient;
}
