// @ts-ignore
import { observable, decorate } from 'mobx'

export class MarketStore {
  constructor(options) {
    if (!options) {
      this.id = undefined
      this.trader = undefined
      this.active = undefined
      this.category = undefined
      this.type = undefined
      this.base = undefined
      this.quote = undefined
      this.maker = undefined
      this.taker = undefined
      this.precisionBase = undefined
      this.precisionQuote = undefined
      this.precisionAmount = undefined
      this.precisionPrice = undefined
    }

    this.id = options.id
    this.trader = options.trader
    this.active = options.active
    this.category = options.category
    this.type = options.type
    this.base = options.base
    this.quote = options.quote
    this.maker = options.maker
    this.taker = options.taker
    this.precisionBase = options.precisionBase
    this.precisionQuote = options.precisionQuote
    this.precisionAmount = options.precisionAmount
    this.precisionPrice = options.precisionPrice
  }
}

decorate(MarketStore, {
  active: observable,
  base: observable,
  category: observable,
  id: observable,
  maker: observable,
  precisionAmount: observable,
  precisionBase: observable,
  precisionPrice: observable,
  precisionQuote: observable,
  quote: observable,
  taker: observable,
  trader: observable,
  type: observable,
})
