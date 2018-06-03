import { act } from '../../../../common/hemera/client'
import { log } from '../../../../common/log'

export default async function orderBook(obj, args) {
  try {
    log.debug({ method: 'orderBook', obj, args })

    const { key } = args

    const result = await act({
      topic: 'OrderBook',
      cmd: 'getOrderBook',
      key,
    })

    if (!result) {
      return undefined
    }

    return {
      key,

      bids: Object.keys(result.bids).map((k) => {
        return {
          rate: k,
          amount: result.bids[k] || '0.00000000',
        }
      }),

      asks: Object.keys(result.asks).map((k) => {
        return {
          rate: k,
          amount: result.asks[k] || '0.00000000',
        }
      }),
    }
  } catch (error) {
    throw error
  }
}
