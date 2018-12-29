import { upsertMarket } from '../common/domain/mutations/upsertMarket'
import { getApolloClient } from '../common/apollo/client'
import { markets } from '../common/domain/queries/markets'

import { fetchMarkets } from './fetch-markets'
import { sanitizeMarket } from './sanitize-market'

export async function ensureMarkets() {
  console.log('ensureMarkets')

  const apolloClient = getApolloClient()

  const dbMarkets = (await apolloClient.query({ query: markets })).data.markets
  const apiMarkets = (await fetchMarkets()).map(sanitizeMarket)

  const marketsWithId = apiMarkets.reduce((memo, currentApiMarket) => {
    const dbMarketResult = dbMarkets.find(
      (currentDbMarket) =>
        currentDbMarket.trader === currentApiMarket.trader &&
        currentDbMarket.base === currentApiMarket.base &&
        currentDbMarket.quote === currentApiMarket.quote,
    )

    memo.push({
      ...currentApiMarket,
      id: (dbMarketResult && dbMarketResult.id) || '',
    })

    return memo
  }, [])

  await Promise.all(
    marketsWithId.map((market) => {
      return apolloClient.mutate({
        mutation: upsertMarket,
        variables: {
          ...market,
          id: market.id || '',
        },
      })
    }),
  )

  console.log('ensureMarkets complete', marketsWithId.length)
}
