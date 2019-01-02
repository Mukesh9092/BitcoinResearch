import dotenv from 'dotenv'
import fetch from 'cross-fetch'

import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { isServer } from '../environment'

dotenv.config()

const { PRISMA_HOST, PRISMA_PORT } = process.env

let client
export function getApolloClient() {
  if (client) return client

  const cache = new InMemoryCache()

  let uri
  if (isServer()) {
    uri = `http://${PRISMA_HOST}:${PRISMA_PORT}/`
  } else {
    uri = `http://prisma.localtest.me`
  }

  const link = new HttpLink({ uri, fetch })

  if (!isServer()) {
    // eslint-disable-next-line no-underscore-dangle
    cache.restore(window.__APOLLO_STATE__)
  }

  client = new ApolloClient({
    cache,
    link,
    ssrMode: isServer(),
  })

  return client
}
