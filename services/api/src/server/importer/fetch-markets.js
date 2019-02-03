import { binance as Binance } from 'ccxt'

import { timedPromise } from '../../common/promise'

export async function fetchMarkets() {
  const exchange = new Binance()
  const markets = await exchange.loadMarkets()
  const result = Object.keys(markets).map((key) => {
    return markets[key]
  })

  await timedPromise(500)

  return result
}
