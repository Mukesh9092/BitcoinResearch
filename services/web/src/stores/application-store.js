import { observable } from 'mobx'

import { ChartStore } from './chart-store'
import { DashboardStore } from './dashboard-store'
import { UserStore } from './user-store'
import { getApolloClient } from '../common/apollo/client'

export class ApplicationStore {
  apolloClient = getApolloClient()

  @observable title = 'Application'

  @observable chartStore = new ChartStore()

  @observable dashboardStore = new DashboardStore()

  @observable user = new UserStore()
}
