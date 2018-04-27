// import fetch from 'cross-fetch';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import 'isomorphic-fetch';

let client;

export function getApolloClient(options = { isServer: false, headers: {} }) {
  if (client) {
    return client;
  }

  const { isServer, headers } = options;

  const ssrMode = isServer;

  let initialState = {};
  if (!isServer) {
    initialState = window.__APOLLO_STATE__;
  }

  let uri = 'graphql.api.docker.localhost';
  if (isServer) {
    const { API_GRAPHQL_HOST, API_GRAPHQL_PORT } = process.env;
    uri = `http://${API_GRAPHQL_HOST}:${API_GRAPHQL_PORT}${uri}`;
  }

  const httpLink = new HttpLink({ uri });

  const authLink = setContext((_, props) => {
    const output = {
      headers: {
        ...props.headers,
      },
    };

    if (isServer) {
      output.headers = {
        ...output.headers,
        ...headers,
      };
    }

    return output;
  });

  const link = authLink.concat(httpLink);

  let cache = new InMemoryCache();
  if (!isServer) {
    console.log(window.__APOLLO_STATE__);

    cache = new InMemoryCache().restore(window.__APOLLO_STATE__);
  }

  console.log('cache', cache.data.data);

  client = new ApolloClient({
    ssrMode,
    initialState,
    link,
    cache,
  });

  console.log('uri', uri);

  return client;
}
