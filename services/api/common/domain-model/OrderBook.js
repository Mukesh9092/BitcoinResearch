import { log } from '../../common/log'

export default class OrderBook {
  constructor({ key }) {
    this.key = key
    this.bids = {}
    this.asks = {}

    this.updateCache = []
    this.stateReceived = false
  }

  applyUpdate(bids, asks) {
    bids.forEach((entry) => {
      const { price, amount } = entry
      this.bids[price] = amount
    })

    asks.forEach((entry) => {
      const { price, amount } = entry
      this.asks[price] = amount
    })
  }

  state({ lastUpdateId, bids, asks }) {
    this.bids = bids
    this.asks = asks

    this.updateCache.forEach((update) => {
      if (update.lastId <= lastUpdateId) {
        return
      }

      this.applyUpdate(update.bids, update.asks)
    })

    this.updateCache = []

    this.stateReceived = true
  }

  update({ firstId, lastId, bids, asks }) {
    if (!this.stateReceived) {
      this.updateCache.push({ firstId, lastId, bids, asks })
    }

    this.applyUpdate(bids, asks)
  }
}
