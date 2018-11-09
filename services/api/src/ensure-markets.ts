import { Market } from 'ccxt'
import { ApolloClient } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'

import { IMarket } from '../common/domain/types/IMarket'
import { upsertMarket } from '../common/domain/mutations/upsertMarket'
import { getServerApolloClient } from '../common/apollo/client'
import { markets } from '../common/domain/queries/markets'

import { fetchMarkets } from './fetch-markets'

function sanitizeMarket (market: Market): IMarket {
  return {
    active: Boolean(market.active),
    base: String(market.base),
    category: 'CRYPTO',
    maker: String(market.maker),
    precisionAmount: Number(market.precision.amount),
    precisionBase: Number(market.precision.base),
    precisionPrice: Number(market.precision.price),
    precisionQuote: Number(market.precision.quote),
    quote: String(market.quote),
    taker: String(market.taker),
    trader: 'binance',
    type: 'CURRENCY',
  }
}

export async function ensureMarkets (): Promise<void> {
  const apolloClient: ApolloClient<NormalizedCacheObject> = getServerApolloClient()

  const dbMarkets: IMarket[] = (await apolloClient.query({ query: markets })).data.markets
  const apiMarkets: IMarket[] = (await fetchMarkets()).map(sanitizeMarket)

  const marketsWithId: IMarket[] = apiMarkets.reduce((memo: IMarket[], currentApiMarket: IMarket): IMarket[] => {
    const dbMarketResult: IMarket = dbMarkets.find((currentDbMarket: IMarket): boolean => {
      return currentDbMarket.trader === currentApiMarket.trader &&
        currentDbMarket.base === currentApiMarket.base &&
        currentDbMarket.quote === currentApiMarket.quote
    })

    memo.push({
      ...currentApiMarket,
      id: dbMarketResult && dbMarketResult.id || '',
    })

    return memo
  }, [])

  await Promise.all(
    marketsWithId
      .map((market: IMarket) => {
        return apolloClient.mutate({
          mutation: upsertMarket,
          variables: {
            ...market,
            id: market.id || '',
          },
        })
      }),
  )
}
