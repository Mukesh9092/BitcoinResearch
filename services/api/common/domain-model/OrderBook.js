import { log } from '../../common/log'

export default class OrderBook {
  constructor({ key }) {
    this.key = key
    this.bids = {}
    this.asks = {}

    this._updateCache = []
    this._stateReceived = false
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

    this._updateCache.forEach((update) => {
      if (update.lastId <= lastUpdateId) {
        return
      }

      this.applyUpdate(update.bids, update.asks)
    })

    this._updateCache = []

    this._stateReceived = true
  }

  update({ firstId, lastId, bids, asks }) {
    if (!this._stateReceived) {
      this._updateCache.push({ firstId, lastId, bids, asks })
    }

    this.applyUpdate(bids, asks)
  }
}
