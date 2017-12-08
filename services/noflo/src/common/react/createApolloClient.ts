import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch";

// createNetworkInterface

import { isBrowser } from "../environment";

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser()) {
  global.fetch = fetch;
}

let link = null;
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
    link: new HttpLink({
      uri,
      fetch,
      opts: {
        // Additional fetch() options like `credentials` or `headers`
        credentials: "same-origin"
      }
    }),
    cache: new InMemoryCache(),
    ssrMode: !isBrowser(),
    initialState,
  });

  return apolloClient;
}
