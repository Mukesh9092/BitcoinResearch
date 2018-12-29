import { startOfYear, endOfYear } from 'date-fns'


import { getApolloClient } from '../common/apollo/client'
import { getExpectedLengthForPeriod } from '../common/ohlcv'
import { markets } from '../common/domain/queries/markets'
import { oHLCVs } from '../common/domain/queries/oHLCVs'

import { createOHLCVs } from './create-ohlcvs'
import { fetchOHLCVs } from './fetch-ohlcvs'

async function ensureMarket(market) {
  const apolloClient = getApolloClient()
  const now = new Date()
  const start = startOfYear(now)
  const end = endOfYear(now)

  const from = start.toISOString()
  const period = '1d'
  const to = end.toISOString()
  const symbol = `${market.base}/${market.quote}`

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

  const expectedLength = getExpectedLengthForPeriod(period, from, to)
  const actualLength = oHLCVsResult.data.oHLCVs.length

  if (expectedLength === actualLength) {
    return;
  }

  let ohlcvs = await fetchOHLCVs(symbol, period, from, expectedLength)

  ohlcvs = ohlcvs.map((x) => {
    const [timestamp, open, high, low, close, volume] = x

    return [timestamp, market.base, market.quote, period, open, high, low, close, volume]
  })

  await createOHLCVs(market, period, ohlcvs)
}

export async function ensureOHLCVs() {
  console.log('ensureOHLCVs')

  const apolloClient = getApolloClient()
  const marketsResult = await apolloClient.query({ query: markets })

  const sanitizedMarkets = Object.keys(marketsResult.data.markets).map((key) => marketsResult.data.markets[key])

  let i = 1
  // eslint-disable-next-line no-restricted-syntax
  for (const market of sanitizedMarkets) {
    // eslint-disable-next-line no-await-in-loop
    await ensureMarket(market)

    const result = Math.floor((i / sanitizedMarkets.length) * 100)

    console.log(`ensureOHLCVs ${result}% (${market.quote} / ${market.base})`)

    i += 1
  }

  console.log('ensureOHLCVs complete')
}
