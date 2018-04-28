// import { getCurrencyPairs } from '../../common/database/repositories/currency-pair'
import { getHemeraClient } from '../../common/hemera/client'
import { log } from '../../common/log'

import OrderBook from '../../common/domain-model/OrderBook'

async function start() {
  try {
    const hemera = await getHemeraClient()

    const orderBooks = {}

    hemera.add({ topic: 'OrderBook', cmd: 'getOrderBook' }, async event => {
      log.info(['getOrderBook', event.marketKey, orderBooks[event.marketKey]])
      return orderBooks[event.marketKey]
    })

    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'orderBook' },
      ({ data: { marketKey, bids, asks } }) => {
        orderBooks[marketKey] = new OrderBook({ bids, asks })

        return true
      },
    )

    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'orderBookModify' },
      ({ data: { marketKey, mutationSide, rate, amount } }) => {
        orderBooks[marketKey].modify(`${mutationSide}s`, rate, amount)

        return true
      },
    )

    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'orderBookRemove' },
      ({ data: { marketKey, mutationSide, rate } }) => {
        orderBooks[marketKey].remove(`${mutationSide}s`, rate)

        return true
      },
    )

    hemera.add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'orderBookNewTrade' },
      ({ data: { marketKey, mutationSide, rate, amount } }) => {
        const side = mutationSide === 'buy' ? 'bids' : 'asks'

        orderBooks[marketKey].trade(side, rate, amount)

        return true
      },
    )
  } catch (error) {
    log.error(error)
  }
}

start()
