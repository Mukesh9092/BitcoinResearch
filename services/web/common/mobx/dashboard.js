import { observable, when } from 'mobx'

import { createChart } from '../domain/mutations/createChart'
import { getUserWithDashboardWithChartsWithMarketByUserId } from '../domain/queries/getUserWithDashboardWithChartsWithMarketByUserId'
import { markets } from '../domain/queries/markets'

import { apolloMutationStoreFactory } from './apollo-mutation-store-factory'
import { apolloQueryStoreFactory } from './apollo-query-store-factory'

export class DashboardStore {
  @observable dashboardQuery = apolloQueryStoreFactory({
    query: getUserWithDashboardWithChartsWithMarketByUserId,
  })

  @observable marketsQuery = apolloQueryStoreFactory({
    query: markets,
  })

  @observable createChartMutation = apolloMutationStoreFactory({
    query: createChart,
  })
}
