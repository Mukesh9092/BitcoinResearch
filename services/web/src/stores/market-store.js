import { observable } from 'mobx'

import { getApolloClient } from '../common/apollo/client'

export class MarketStore {
  apolloClient = getApolloClient()

  @observable id

  @observable trader

  @observable active

  @observable category

  @observable type

  @observable base

  @observable quote

  @observable maker

  @observable taker

  @observable precisionBase

  @observable precisionQuote

  @observable precisionAmount

  @observable precisionPrice

  constructor(market) {
    if (market) {
      this.id = market.id
      this.trader = market.trader
      this.active = market.active
      this.category = market.category
      this.type = market.type
      this.base = market.base
      this.quote = market.quote
      this.maker = market.maker
      this.taker = market.taker
      this.precisionBase = market.precisionBase
      this.precisionQuote = market.precisionQuote
      this.precisionAmount = market.precisionAmount
      this.precisionPrice = market.precisionPrice
    }
  }
}
