import { binance as Binance, Exchange, Market } from 'ccxt'
import { ApolloClient, ApolloQueryResult } from 'apollo-client'
import { NormalizedCacheObject } from 'apollo-cache-inmemory'
import { startOfYear, endOfYear } from 'date-fns'

import { IMarket } from '../common/domain/types/IMarket'
import { IOHLCV } from '../common/domain/types/IOHLCV'
import { createOHLCV } from '../common/domain/mutations/createOHLCV'
import { deleteManyOHLCVs } from '../common/domain/mutations/deleteManyOHLCVs'
import { getExpectedLengthForPeriod } from '../common/ohlcv'
import { getServerApolloClient } from '../common/apollo/client'
import { markets } from '../common/domain/queries/markets'
import { oHLCVs } from '../common/domain/queries/oHLCVs'

function timedPromise (timeout: number): Promise<void> {
  return new Promise((resolve: Function) => {
    return setTimeout(() => {
      resolve()
    }, timeout)
  })
}

export interface IWithId {
  id: String
}

export type IExchangeOHLCV = [ number, number, number, number, number, number ]

export async function fetchOHLCVs (
  symbol: string,
  period: string,
  since: Date,
  limit: number,
): Promise<IExchangeOHLCV[]> {
  console.log('fetchOHLCVs', symbol, period, since, limit)

  const exchange: Exchange = new Binance()

  const start: number = new Date(since).valueOf()

  const result = await exchange.fetchOHLCV(symbol, period, start, limit)

  await timedPromise(500)

  return result
}

export async function destroyOHLCVs (market: IMarket, period: string, from: Date, to: Date): Promise<void> {
  console.log('destroyOHLCVs')

  const apolloClient: ApolloClient<NormalizedCacheObject> = getServerApolloClient()

  const queryVariables = {
    from,
    marketBase: market.base,
    marketQuote: market.quote,
    period,
    to,
  }

  const result = await apolloClient.mutate({
    mutation: deleteManyOHLCVs,
    variables: queryVariables,
  })

  console.log('destroyOHLCVs result', result)
}

export async function createOHLCVs (market: IMarket, period: string, ohlcvs: IExchangeOHLCV[]): Promise<void> {
  console.log('createOHLCVs')

  const apolloClient: ApolloClient<NormalizedCacheObject> = getServerApolloClient()

  await Promise.all(ohlcvs.map((oHLCV: IExchangeOHLCV) => {
    const [ timestamp, open, high, low, close, volume ] = oHLCV

    const variables = {
      close,
      high,
      low,
      marketBase: market.base,
      marketQuote: market.quote,
      open,
      period,
      timestamp: new Date(timestamp).toISOString(),
      volume,
    }

    return apolloClient.mutate({
      mutation: createOHLCV,
      variables,
    })
  }))
}

export async function importMarket (market: IMarket): Promise<void> {
  const apolloClient: ApolloClient<NormalizedCacheObject> = getServerApolloClient()

  const now = new Date()
  const start = startOfYear(now)
  const end = endOfYear(now)

  const from = start.toISOString()
  const period = '1d'
  const to = end.toISOString()
  const symbol = `${market.base}/${market.quote}`

  console.log(`importMarket ${symbol}`)

  const queryVariables = {
    from,
    marketBase: market.base,
    marketQuote: market.quote,
    period,
    to,
  }

  const oHLCVsResult: ApolloQueryResult<IMarket> = await apolloClient.query({
    query: oHLCVs,
    variables: queryVariables,
  })

  const expectedLength: number = getExpectedLengthForPeriod(period, from, to)
  const actualLength: number = oHLCVsResult.data.oHLCVs.length

  if (expectedLength !== actualLength) {
    await destroyOHLCVs(market, period, from, to)

    const ohlcvs: IExchangeOHLCV[] = await fetchOHLCVs(symbol, period, from, expectedLength)

    await createOHLCVs(market, period, ohlcvs)
  }
}

export async function ensureOHLCVs (): Promise<void> {
  console.log('ensureOHLCVs')

  const apolloClient: ApolloClient<NormalizedCacheObject> = getServerApolloClient()

  const marketsResult: ApolloQueryResult<IMarket> = await apolloClient.query({ query: markets })

  for (const x of marketsResult.data.markets) {
    await importMarket(x)
  }

  console.log('ensureOHLCVs complete')
}
