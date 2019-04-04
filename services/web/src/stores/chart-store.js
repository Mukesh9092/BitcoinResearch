import { observable } from 'mobx'
import { subMonths, subDays, subHours, subMinutes } from 'date-fns'
import { task } from 'mobx-task'

import { MarketStore } from './market-store'
import { OHLCVStore } from './ohlcv-store'
import { getApolloClient } from '../common/apollo/client'
import { getChartById } from '../queries/getChartById'

export class ChartStore {
  static getDefaultPeriod() {
    return 'MINUTE1'
  }

  // The amount of bars to load across all periods
  static getDefaultBarsAmount() {
    return 500
  }

  static getNewFromDate(from, period, amount) {
    switch (period) {
      case 'MINUTE1':
        return subMinutes(from, amount)

      case 'MINUTE15':
        return subMinutes(from, amount * 15)

      case 'HOUR1':
        return subHours(from, amount)

      case 'HOUR6':
        return subHours(from, amount * 6)

      case 'HOUR12':
        return subHours(from, amount * 12)

      case 'DAY1':
      default:
        return subDays(from, amount)
    }
  }

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
