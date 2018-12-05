import { action, observable } from 'mobx'

import { MarketStore } from './market'
import { apolloQueryStoreFactory } from './apollo-query-store-factory'
import { oHLCVs } from '../domain/queries/oHLCVs'

export class ChartStore {
  @observable id

  @observable market

  @observable ohlcvs = []

  @observable getOHLCVsQuery = apolloQueryStoreFactory({
    query: oHLCVs,
  })

  constructor(options) {
    if (options) {
      this.id = options.id
      this.market = new MarketStore(options.market)
    }
  }

  @action async getOHLCVs({ marketBase, marketQuote, from, to, period }) {
    await this.getOHLCVsQuery.query({
      variables: {
        marketBase,
        marketQuote,
        from,
        to,
        period,
      },
    })

    this.ohlcvs = this.getOHLCVsQuery.result
  }
}
