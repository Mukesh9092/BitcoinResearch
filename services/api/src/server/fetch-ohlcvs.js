import { binance as Binance } from 'ccxt'

import { timedPromise } from '../common/promise'

const periodLookupTable = {
  MINUTE1: '1m',
  MINUTE3: '3m',
  MINUTE5: '5m',
  MINUTE15: '15m',
  MINUTE30: '30m',
  HOUR1: '1h',
  HOUR2: '2h',
  HOUR4: '4h',
  HOUR6: '6h',
  HOUR8: '8h',
  HOUR12: '12h',
  DAY1: '3d',
  DAY3: '3d',
  WEEK1: '1w',
  MONTH1: '1M',
}

export async function fetchOHLCVs(symbol, period, since, limit) {
  const exchange = new Binance()
  const start = new Date(since).valueOf()
  const result = await exchange.fetchOHLCV(symbol, periodLookupTable[period], start, limit)

  await timedPromise(500)

  return result
}

