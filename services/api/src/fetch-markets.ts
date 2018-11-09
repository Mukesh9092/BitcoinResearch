import { binance as Binance, Exchange, Market } from 'ccxt'

import { IMarket } from '../common/domain/types/IMarket'

export async function fetchMarkets (): Promise<IMarket[]> {
  const exchange: Exchange = new Binance()
  const markets: { [symbol: string]: IMarket } = await exchange.loadMarkets()

  return Object.keys(markets)
    .map((key: string) => markets[key])
}
