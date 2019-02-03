import dotenv from 'dotenv'

import { getApolloClient } from '../../common/apollo/client'

import { createMarket } from './mutations/createMarket'
import { deleteManyMarkets } from './mutations/deleteManyMarkets'

import { fetchMarkets } from './fetch-markets'
import { sanitizeMarket } from './sanitize-market'

dotenv.config()

const { PRISMA_HOST, PRISMA_PORT } = process.env

export async function ensureMarkets() {
  console.log('ensureMarkets creating markets')

  const apolloClient = getApolloClient({
    uri: `http://${PRISMA_HOST}:${PRISMA_PORT}`,
  })

  // const dbMarkets = (await apolloClient.query({ query: markets })).data.markets

  console.log('ensureMarkets fetching markets')

  const apiMarkets = (await fetchMarkets()).map(sanitizeMarket)

  console.log('ensureMarkets markets fetched', apiMarkets.length)

  console.log('ensureMarkets deleting existing markets')

  await apolloClient.mutate({ mutation: deleteManyMarkets })

  console.log('ensureMarkets existing markets deleted')

  console.log('ensureMarkets creating new markets')

  await Promise.all(
    apiMarkets.map((market) => {
      return apolloClient.mutate({
        mutation: createMarket,
        variables: market,
      })
    }),
  )

  console.log('ensureMarkets completed')
}
