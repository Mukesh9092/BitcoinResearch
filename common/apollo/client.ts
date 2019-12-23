import { ApolloCache } from 'apollo-cache'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import fetch from 'cross-fetch'
import { isServer } from '../environment'

interface Options {
  cache?: ApolloCache<NormalizedCacheObject>
  uri?: string
  link?: ApolloLink
}

export const getApolloClient = (options: Options = {}) => {
  const server = isServer()
  const cache = options.cache || new InMemoryCache()

  if (!server) {
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    cache.restore(window.__APOLLO_STATE__)
  }

  const link = options.link || new HttpLink({ uri: options.uri, fetch })

  const client = new ApolloClient({
    cache,
    link,
    ssrMode: isServer(),
  })

  return client
}
