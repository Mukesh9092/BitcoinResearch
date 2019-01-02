import { action, observable } from 'mobx'

import { MarketStore } from './market'
import { DashboardStore } from './dashboard'
import { apolloQueryStoreFactory } from './apollo-query-store-factory'
import { getChartById } from '../domain/queries/getChartById'
import { oHLCVs } from '../domain/queries/oHLCVs'

export class ChartStore {
  @observable id

  @observable from

  @observable to

  @observable period

  @observable dashboard

  @observable market

  @observable ohlcvs = []

  @observable chartQuery = apolloQueryStoreFactory({
    query: getChartById,
  })

  @observable getOHLCVsQuery = apolloQueryStoreFactory({
    query: oHLCVs,
  })

  constructor(options) {
    if (options) {
      this.id = options.id

      if (options.dashboard) {
        this.dashboard = new DashboardStore(options.dashboard)
      }

      if (options.market) {
        this.market = new MarketStore(options.market)
      }
    }
  }

  @action async fetchById({ id }) {
    await this.chartQuery.query({
      variables: {
        id,
      }
    })

    const {
      from,
      to,
      period,
      dashboard,
      market,
    } = this.chartQuery.results

    this.id = id
    this.from = from
    this.to = to
    this.period = period

    if (dashboard) {
      this.dashboard = dashboard
    }

    if (market) {
      this.market = market
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
