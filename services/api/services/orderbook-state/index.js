// import { getCurrencyPairs } from '../../common/database/repositories/currency-pair'
import { getHemeraClient } from '../../common/hemera/client'
import { log } from '../../common/log'

import OrderBook from '../../common/domain-model/OrderBook'

async function start() {
  try {
    const hemera = await getHemeraClient()

    // const currencyPairs = await getCurrencyPairs()
    // const currencyPairKeys = currencyPairs.map(currencyPair => currencyPair.key)
    const orderBooks = {}

    hemera.add({ topic: 'OrderBook', cmd: 'getOrderBook' }, async event => {
      log.info(['getOrderBook', event.marketKey, orderBooks[event.marketKey]])
      return orderBooks[event.marketKey]
    })

    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'orderBook' },
      async event => {
        try {
          // log.debug(event)

          const { marketKey, asks, bids } = event.data

          orderBooks[marketKey] = new OrderBook({ bids, asks })

          return true
        } catch (error) {
          log.error(error)
        }
      },
    )

    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'orderBookModify' },
      async event => {
        try {
          // log.debug(event)

          const { marketKey, mutationSide, rate, amount } = event.data

          orderBooks[marketKey].modify(`${mutationSide}s`, rate, amount)

          return true
        } catch (error) {
          log.error(error)
        }
      },
    )

    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'orderBookRemove' },
      async event => {
        try {
          // log.debug(event)

          const { marketKey, mutationSide, rate } = event.data

          orderBooks[marketKey].remove(`${mutationSide}s`, rate)

          return true
        } catch (error) {
          log.error(error)
        }
      },
    )

    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'orderBookNewTrade' },
      async event => {
        try {
          // log.debug(event)

          const { marketKey, mutationSide, rate, amount } = event.data

          const side = mutationSide === 'buy' ? 'bids' : 'asks'

          orderBooks[marketKey].remove(side, rate, amount)

          return true
        } catch (error) {
          log.error(error)
        }
      },
    )
  } catch (error) {
    log.error(error)
  }
}

start()
