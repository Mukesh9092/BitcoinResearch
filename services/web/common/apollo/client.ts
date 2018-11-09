import dotenv from 'dotenv'
import fetch from 'cross-fetch'

import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, GraphQLRequest } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { HttpLink } from 'apollo-link-http'

import { isServer } from '../environment'

dotenv.config()

const { GRAPHQL_HOST, GRAPHQL_PORT } = process.env

const API_URI_CLIENT: string = 'http://graphql.docker.localhost'
const API_URI_SERVER: string = `http://${GRAPHQL_HOST}:${GRAPHQL_PORT}`

interface IGetApolloClientOptions {
  headers: {}
}

/**
 * Returns the Apollo client for the Browser environment.
 * @param options Headers.
 * @returns ApolloClient
 */
export function getServerApolloClient (
  options: IGetApolloClientOptions = { headers: {} },
): ApolloClient<NormalizedCacheObject> {
  const httpLink: HttpLink = new HttpLink({ uri: API_URI_SERVER, fetch })
  const authLink: ApolloLink = setContext(
    (request: GraphQLRequest, { headers }: { headers: {} }): {} => ({
      headers: {
        ...headers,
        ...options.headers,
      },
    }),
  )

  const link: ApolloLink = authLink.concat(httpLink)
  const cache: InMemoryCache = new InMemoryCache()

  return new ApolloClient({ link, cache, ssrMode: true })
}

/*
 * Returns the Apollo client for the Browser environment.
 * @param options Headers.
 * @returns ApolloClient
 */
export function getBrowserApolloClient (
  options: IGetApolloClientOptions = { headers: {} },
): ApolloClient<NormalizedCacheObject> {
  const httpLink: HttpLink = new HttpLink({ uri: API_URI_CLIENT, fetch })
  const authLink: ApolloLink = setContext(
    (request: GraphQLRequest, { headers }: { headers: {} }): {} => ({
      headers: {
        ...headers,
        ...options.headers,
      },
    }),
  )

  const link: ApolloLink = authLink.concat(httpLink)
  const cache: InMemoryCache = new InMemoryCache().restore(window.__APOLLO_STATE__)

  return new ApolloClient({ link, cache })
}

export function getApolloClient (
  options: IGetApolloClientOptions = { headers: {} },
): ApolloClient<NormalizedCacheObject> {
  const httpLink: HttpLink = new HttpLink({
    fetch,
    uri: isServer() ? API_URI_SERVER : API_URI_CLIENT,
  })
  const authLink: ApolloLink = setContext(
    (request: GraphQLRequest, { headers }: { headers: {} }): {} => ({
      headers: {
        ...headers,
        ...options.headers,
      },
    }),
  )

  const link: ApolloLink = authLink.concat(httpLink)
  const cache: InMemoryCache = new InMemoryCache()

  if (isServer()) {
    cache.restore(window.__APOLLO_STATE__)
  }

  return new ApolloClient({ link, cache })
}
