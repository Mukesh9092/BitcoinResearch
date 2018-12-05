import { observable } from 'mobx'

export class MarketStore {
  @observable id = undefined

  @observable trader = undefined

  @observable active = undefined

  @observable category = undefined

  @observable type = undefined

  @observable base = undefined

  @observable quote = undefined

  @observable maker = undefined

  @observable taker = undefined

  @observable precisionBase = undefined

  @observable precisionQuote = undefined

  @observable precisionAmount = undefined

  @observable precisionPrice = undefined

  constructor(options) {
    if (options) {
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
}
