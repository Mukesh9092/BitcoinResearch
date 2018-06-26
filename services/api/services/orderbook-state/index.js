import { add } from '../../common/hemera/client'
import { log } from '../../common/log'

import OrderBook from '../../common/domain-model/OrderBook'

const orderBooks = {}

function ensureOrderbook(key) {
  orderBooks[key] = orderBooks[key] || new OrderBook(key)

  return orderBooks[key]
}

async function start() {
  try {
    await add({ topic: 'OrderBook', cmd: 'getOrderBook' }, async (event) => {
      const { key, bids, asks } = ensureOrderbook(event.key)

      return {
        key,
        bids,
        asks,
      }
    })

    await add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'state' },
      ({ data: { key, lastUpdateId, bids, asks } }) => {
        const orderBook = ensureOrderbook(key)

        orderBook.state({
          lastUpdateId,
          bids,
          asks,
        })

        return true
      },
    )

    await add(
      { pubsub$: true, topic: 'OrderBookEvents', cmd: 'update' },
      ({ data: { key, type, time, firstId, lastId, bids, asks } }) => {
        const orderBook = ensureOrderbook(key)

        orderBook.update({
          firstId,
          lastId,
          bids,
          asks,
        })

        return true
      },
    )
  } catch (error) {
    log.error(error)
  }
}

start()
