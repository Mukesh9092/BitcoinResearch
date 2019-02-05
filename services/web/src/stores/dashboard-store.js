import { observable } from 'mobx'
import { task } from 'mobx-task'

import { ChartStore } from './chart-store'
import { MarketStore } from './market-store'
import { createChart } from '../mutations/createChart'
import { deleteChart } from '../mutations/deleteChart'
import { getApolloClient } from '../common/apollo/client'
import { getCurrentUserWithDashboardWithCharts } from '../queries/getCurrentUserWithDashboardWithCharts'
import { getMarkets } from '../queries/getMarkets'

export class DashboardStore {
  apolloClient = getApolloClient()

  @observable id

  @observable charts = []

  @observable markets = []

  constructor(options) {
    if (options) {
      this.setFromObject(options)
    }
  }

  setFromObject(object) {
    this.id = object.id

    if (object.charts) {
      this.charts = object.charts.map((x) => {
        return new ChartStore(x)
      })
    }

    if (object.markets) {
      this.markets = object.charts.map((x) => {
        return new MarketStore(x)
      })
    }
  }

  @task async fetch({ userId }) {
    const result = await this.apolloClient.query({
      query: getCurrentUserWithDashboardWithCharts,
      selector: (x) => {
        return x.user.dashboard
      },
      variables: {
        userId,
      },
    })

    this.setFromObject(result.data.getCurrentUser.dashboard)
  }

  @task async fetchMarkets() {
    const result = await this.apolloClient.query({
      query: getMarkets,
    })

    this.markets = result.data.getMarkets.map((x) => {
      return new MarketStore(x)
    })
  }

  @task async createChart({ userId, dashboardId, base, quote, from, to, period }) {
    const result = await this.apolloClient.mutate({
      mutation: createChart,
      variables: {
        dashboardId,
        base,
        quote,
        from,
        to,
        period,
      },
    })

    this.charts.push(new ChartStore(result.data.createChart))
  }

  @task async deleteChart({ chartId }) {
    const result = await this.apolloClient.mutate({
      mutation: deleteChart,
      variables: {
        chartId,
      },
    })

    this.charts = this.charts.filter((x) => {
      return x.id !== chartId
    })
  }

  @task async navigateToChartPage({ chartId }) {
    await this.props.history.push(`/chart/${chartId}`)
  }
}
