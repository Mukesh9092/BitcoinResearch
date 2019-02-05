import { observable } from 'mobx'
import { task } from 'mobx-task'

import { ApolloQueryStore } from './apollo-query-store'
import { MarketStore } from './market-store'
import { OHLCVStore } from './ohlcv-store'
import { getApolloClient } from '../common/apollo/client'
import { getChartById } from '../queries/getChartById'

export class ChartStore {
  apolloClient = getApolloClient()

  @observable id

  @observable from

  @observable to

  @observable period

  @observable marketStore

  @observable ohlcvStore

  constructor(options) {
    if (options) {
      this.setFromObject(options)
    }
  }

  setFromObject(object) {
    this.id = object.id
    this.from = object.from
    this.to = object.to
    this.period = object.period

    this.marketStore = new MarketStore({
      base: object.base,
      quote: object.quote,
    })
    this.ohlcvStore = new OHLCVStore(object.ohlcvs)
  }

  @task async fetch({ id }) {
    const result = await this.apolloClient.query({
      query: getChartById,
      variables: {
        id,
      },
    })

    this.setFromObject(result.data.getChartById)
  }
}
