import { log } from '../log'

export default class OrderBook {
  constructor({ bids = {}, asks = {} }) {
    log.debug(
      `OrderBook#constructor ${Object.keys(bids).length} ${
        Object.keys(asks).length
      }`,
    )

    this.bids = bids
    this.asks = asks
  }

  modify(side, rate, amount) {
    log.debug(`OrderBook#modify ${side} ${rate} ${amount}`)

    this[side][rate] = amount

    log.debug(this)
  }

  trade(side, rate, amount) {
    log.debug(`OrderBook#trade ${side} ${rate} ${amount}`)

    this[side][rate] -= amount
  }

  remove(side, rate) {
    log.debug(`OrderBook#remove ${side} ${rate}`)

    delete this[side][rate]
  }
}
