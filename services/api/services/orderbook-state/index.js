// import { getCurrencyPairs } from '../../common/database/repositories/currency-pair'
import { getHemeraClient } from '../../common/hemera/client'
import { log } from '../../common/log'

import OrderBook from '../../common/domain-model/OrderBook'

const orderBooks = {}
let hemeraClient

function ensureOrderbook(key) {
  orderBooks[key] = orderBooks[key] || new OrderBook(key)

  return orderBooks[key]
}

async function start() {
  try {
    hemeraClient = await getHemeraClient()

    // How to save the cache per order book?
    // What if no state event comes by? It would leak memory.

    hemeraClient.add(
      { topic: 'OrderBook', cmd: 'getOrderBook' },
      async (event) => {
        const { key, bids, asks } = ensureOrderbook(event.key)

        return {
          key,
          bids,
          asks,
        }
      },
    )

    hemeraClient.add(
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

    hemeraClient.add(
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
