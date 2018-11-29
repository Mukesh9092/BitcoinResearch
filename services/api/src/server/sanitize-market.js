export function sanitizeMarket(market) {
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
