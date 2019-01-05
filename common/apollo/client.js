import dotenv from 'dotenv'
import fetch from 'cross-fetch'

import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { isServer } from '../environment'

dotenv.config()

const { API_HOST, API_PORT } = process.env

export function getApolloClient(options) {
  const cache = options.cache || new InMemoryCache()

  let uri
  if (options.uri) {
    uri = options.uri
  } else {
    if (isServer()) {
      options.uri = `http://${API_HOST}:${API_PORT}/`
    } else {
      options.uri = `http://api.localtest.me`
    }
  }

  const link = options.link || new HttpLink({ uri, fetch })

  if (!isServer()) {
    // eslint-disable-next-line no-underscore-dangle
    cache.restore(window.__APOLLO_STATE__)
  }

  const client = new ApolloClient({
    cache,
    link,
    ssrMode: isServer(),
  })

  return client
}
