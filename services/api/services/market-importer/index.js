import ccxt from 'ccxt'

import { act } from '../../common/hemera/client'
import { log } from '../../common/log'

log.setLevel('debug')

const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24
const TEN_SECONDS_IN_MILLISECONDS = 1000 * 10
const INTERVAL = ONE_DAY_IN_MILLISECONDS

const Binance = ccxt.binance

const exchange = new Binance()

async function start() {
  try {
    const markets = await exchange.loadMarkets()

    await Promise.all(
      Object.values(markets).map((market) => {
        return act({
          pubsub$: true,
          topic: 'MarketsEvents',
          cmd: 'state',
          data: market,
        })
      }),
    )
  } catch (error) {
    log.error(error)
  }
}

setInterval(start, INTERVAL)

start()
