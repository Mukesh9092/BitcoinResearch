import dotenv from 'dotenv'
import gql from 'graphql-tag'

import { debug } from '../common/log'
import { getApolloClient } from '../common/apollo/client'

import { createOHLCVTables } from '../common/domain/mutations/createOHLCVTables'
import { markets } from '../common/domain/queries/markets'

import { fetchMarkets } from './fetch-markets'
import { getPeriodValues } from './get-period-values'
import { sanitizeMarket } from './sanitize-market'

dotenv.config()

const { PRISMA_HOST, PRISMA_PORT } = process.env

export async function ensureMarkets() {
  console.log('ensureMarkets creating markets')

  const apolloClient = getApolloClient({
    uri: `http://${PRISMA_HOST}:${PRISMA_PORT}`
  })

  // const dbMarkets = (await apolloClient.query({ query: markets })).data.markets
  const apiMarkets = (await fetchMarkets()).map(sanitizeMarket)

  await apolloClient.mutate({
    mutation: gql`
      mutation {
        deleteManyMarkets(where:{}) {
          count
        }
      }
    `
  })

  await Promise.all(
    apiMarkets.map((market) => {
      return apolloClient.mutate({
        mutation: gql`
          mutation createMarket(
            $active: Boolean!
            $enabled: Boolean!
            $trader: String!
            $category: String!
            $type: String!
            $base: String!
            $quote: String!
            $maker: String!
            $taker: String!
            $precisionAmount: Int!
            $precisionBase: Int!
            $precisionPrice: Int!
            $precisionQuote: Int!
          ) {
            createMarket(data: {
              active: $active
              enabled: $enabled
              trader: $trader
              category: $category
              type: $type
              base: $base
              quote: $quote
              maker: $maker
              taker: $taker
              precisionAmount: $precisionAmount
              precisionBase: $precisionBase
              precisionPrice: $precisionPrice
              precisionQuote: $precisionQuote
            }) {
              id
            }
          }
        `,
        variables: market,
      })
    }),
  )

  console.log('ensureMarkets created markets: ', apiMarkets.length)
}
