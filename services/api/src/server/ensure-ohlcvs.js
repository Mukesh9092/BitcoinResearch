import { startOfYear, endOfYear } from 'date-fns'

import { getApolloClient } from '../../common/apollo/client'
import { getExpectedLengthForPeriod } from '../../common/ohlcv'
import { markets } from '../../common/domain/queries/markets'
import { oHLCVs } from '../../common/domain/queries/oHLCVs'

import { createOHLCVs } from './create-ohlcvs'
import { destroyOHLCVs } from './destroy-ohlcvs'
import { fetchOHLCVs } from './fetch-ohlcvs'

async function importMarket(market) {
  const apolloClient = getApolloClient()

  const now = new Date()
  const start = startOfYear(now)
  const end = endOfYear(now)

  const from = start.toISOString()
  const period = '1d'
  const to = end.toISOString()
  const symbol = `${market.base}/${market.quote}`

  // console.log(`importMarket ${symbol} requesting`)

  const queryVariables = {
    from,
    marketBase: market.base,
    marketQuote: market.quote,
    period,
    to,
  }

  const oHLCVsResult = await apolloClient.query({
    query: oHLCVs,
    variables: queryVariables,
  })

  // console.log(`importMarket ${symbol} response`)

  const expectedLength = getExpectedLengthForPeriod(period, from, to)
  const actualLength = oHLCVsResult.data.oHLCVs.length

  if (expectedLength !== actualLength) {
    await destroyOHLCVs(market, period, from, to)

    const ohlcvs = await fetchOHLCVs(symbol, period, from, expectedLength)

    await createOHLCVs(market, period, ohlcvs)
  }

  // console.log(`importMarket ${symbol} inserted`)
}

export async function ensureOHLCVs() {
  console.log('ensureOHLCVs')

  const apolloClient = getApolloClient()
  const marketsResult = await apolloClient.query({ query: markets })

  const sanitizedMarkets = Object.keys(marketsResult.data.markets).map((key) => marketsResult.data.markets[key])

  // eslint-disable-next-line no-restricted-syntax
  for (const market of sanitizedMarkets) {
    // eslint-disable-next-line no-await-in-loop
    await importMarket(market)
  }

  console.log('ensureOHLCVs complete')
}
