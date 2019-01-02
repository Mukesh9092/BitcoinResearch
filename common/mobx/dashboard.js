import { action, observable } from 'mobx'

import { createChart } from '../domain/mutations/createChart'
import { deleteChart } from '../domain/mutations/deleteChart'
import { getUserWithDashboardWithChartsWithMarketByUserId } from '../domain/queries/getUserWithDashboardWithChartsWithMarketByUserId'
import { markets } from '../domain/queries/markets'

import { apolloMutationStoreFactory } from './apollo-mutation-store-factory'
import { apolloQueryStoreFactory } from './apollo-query-store-factory'

import { ChartStore } from './chart'
import { MarketStore } from './market'

export class DashboardStore {
  @observable id

  @observable charts = []

  @observable markets = []

  @observable dashboardQuery = apolloQueryStoreFactory({
    query: getUserWithDashboardWithChartsWithMarketByUserId,
    selector: (x) => x.user.dashboard,
  })

  @observable marketsQuery = apolloQueryStoreFactory({
    query: markets,
  })

  @observable createChartMutation = apolloMutationStoreFactory({
    mutation: createChart,
  })

  @observable deleteChartMutation = apolloMutationStoreFactory({
    mutation: deleteChart,
  })

  @action async getDashboard({ userId }) {
    await this.dashboardQuery.query({
      variables: {
        userId,
      },
    })

    this.id = this.dashboardQuery.result.id

    this.charts = this.dashboardQuery.result.charts.map((x) => new ChartStore(x))
  }

  @action async getMarkets() {
    await this.marketsQuery.query()

    this.markets = this.marketsQuery.result.map((x) => new MarketStore(x))
  }

  @action async createChart({ userId, dashboardId, marketId, from, to, period }) {
    await this.createChartMutation.mutate({
      variables: {
        dashboardId,
        marketId,
        from,
        to,
        period,
      },
    })

    this.charts.push(new ChartStore(this.createChartMutation.result))
  }

  @action async deleteChart({ chartId }) {
    await this.deleteChartMutation.mutate({
      variables: {
        id: chartId,
      },
    })

    this.charts = this.charts.filter((x) => x.id !== chartId)
  }

  @action async navigateToChartPage({ chartId }) {
    await this.props.history.push(`/chart/${chartId}`)
  }
}
