import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';

import { isBrowser } from '../environment';

let link: HttpLink;
let apolloClient: ApolloClient<any>;

export default function createApolloClient() {
  // console.log('createApolloClient')

  if (apolloClient) {
    return apolloClient;
  }

  let uri;
  if (isBrowser()) {
    uri = '/api/graphql';
  } else {
    const { API_HOST, API_PORT } = process.env;

    uri = `http://${API_HOST}:${API_PORT}/api/graphql`;
  }

  // console.log('createApolloClient uri', uri);

  apolloClient = new ApolloClient({
    link: new HttpLink({
      uri,
      fetch,
    }),
    cache: new InMemoryCache(),
    ssrMode: !isBrowser(),
  });

  // console.log('createApolloClient apolloClient', apolloClient)

  return apolloClient;
}
