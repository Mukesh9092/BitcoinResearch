import { act } from '../../../../common/hemera/client'
import { log } from '../../../../common/log'

export default async function orderBook(obj, args) {
  try {
    log.debug({ method: 'orderBook', obj, args })

    const { marketKey } = args

    const result = await act({
      topic: 'OrderBook',
      cmd: 'getOrderBook',
      marketKey,
    })

    if (!result) {
      return undefined
    }

    return {
      marketKey,

      bids: Object.keys(result.bids).map(rate => ({
        rate,
        amount: result.bids[rate],
      })),

      asks: Object.keys(result.asks).map(rate => ({
        rate,
        amount: result.asks[rate],
      })),
    }
  } catch (error) {
    throw error
  }
}
