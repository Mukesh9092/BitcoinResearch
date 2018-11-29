import { binance as Binance } from 'ccxt'

import { timedPromise } from '../../common/promise'

export async function fetchOHLCVs(symbol, period, since, limit) {
  const exchange = new Binance()
  const start = new Date(since).valueOf()
  const result = await exchange.fetchOHLCV(symbol, period, start, limit)

  await timedPromise(500)

  return result
}
