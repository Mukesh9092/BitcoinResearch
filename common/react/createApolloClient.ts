import { ApolloClient, createNetworkInterface } from "react-apollo";
import fetch from "isomorphic-fetch";

import { isBrowser } from "../environment";

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser()) {
  global.fetch = fetch;
}

let apolloClient = null;

export default function createApolloClient(initialState) {
  if (apolloClient) {
    return apolloClient;
  }

  let uri;
  if (isBrowser()) {
    uri = "/api/graphql";
  } else {
    const { API_HOST, API_PORT } = process.env;

    uri = `http://${API_HOST}:${API_PORT}/api/graphql`;
  }

  apolloClient = new ApolloClient({
    initialState,
    // Disables forceFetch on the server (so queries are only run once)
    ssrMode: !isBrowser(),
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
