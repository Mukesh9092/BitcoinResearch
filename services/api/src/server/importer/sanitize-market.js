import uuid from 'uuid/v4'

const BASE_MARKET = 'USDT'
const ENABLED_MARKETS = ['BTC', 'ETC', 'LTC']

export function sanitizeMarket(market) {
  const output = {}

  output.id = market.id || uuid()
  output.active = Boolean(market.active)
  output.enabled = output.active && market.quote === BASE_MARKET && ENABLED_MARKETS.includes(market.base)
  output.trader = 'binance'
  output.type = 'CURRENCY'
  output.category = 'CRYPTO'
  output.quote = String(market.quote)
  output.base = String(market.base)
  output.maker = String(market.maker)
  output.taker = String(market.taker)
  output.precisionAmount = Number(market.precision.amount)
  output.precisionBase = Number(market.precision.base)
  output.precisionPrice = Number(market.precision.price)
  output.precisionQuote = Number(market.precision.quote)

  return output
}
