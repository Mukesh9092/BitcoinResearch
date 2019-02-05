import { observable } from 'mobx'

import { getApolloClient } from '../common/apollo/client'

export class MarketStore {
  apolloClient = getApolloClient()

  @observable base

  @observable quote

  constructor(market) {
    if (market) {
      this.base = market.base
      this.quote = market.quote
    }
  }
}
