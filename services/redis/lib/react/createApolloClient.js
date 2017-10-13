import { ApolloClient, createNetworkInterface } from "react-apollo";
import fetch from "isomorphic-fetch";

const { PROXY_HOST, PROXY_PORT, API_HOST, API_PORT } = process.env;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

let apolloClient = null;

export default function createApolloClient(initialState) {
  if (apolloClient) {
    return apolloClient;
  }

  let uri;
  if (process.browser) {
    uri = "/api/graphql";
  } else {
    uri = `http://${API_HOST}:${API_PORT}/api/graphql`;
  }

  apolloClient = new ApolloClient({
    initialState,
    // Disables forceFetch on the server (so queries are only run once)
    ssrMode: !process.browser,
    networkInterface: createNetworkInterface({
      // Server URL (must be absolute)
      uri,
      opts: {
        // Additional fetch() options like `credentials` or `headers`
        credentials: "same-origin"
      }
    })
  });

  return apolloClient;
}
