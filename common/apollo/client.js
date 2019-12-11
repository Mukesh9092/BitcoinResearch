import { InMemoryCache } from 'apollo-cache-inmemory'
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import fetch from 'cross-fetch'
import dotenv from 'dotenv'
import { memoize } from 'lodash'
import { isServer } from '../environment'

dotenv.config()

const { API_HOST, API_PORT } = process.env

export const getApolloClient = memoize((options = {}) => {
  const server = isServer()
  const cache = options.cache || new InMemoryCache()
  const { uri } = options

  if (!server) {
    // eslint-disable-next-line no-underscore-dangle
    cache.restore(window.__APOLLO_STATE__)
  }

  const link = options.link || new HttpLink({ uri, fetch })

  const client = new ApolloClient({
    cache,
    link,
    ssrMode: isServer(),
  })

  return client
})
