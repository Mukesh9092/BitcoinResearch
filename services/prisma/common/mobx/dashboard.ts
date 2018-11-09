import { observable } from 'mobx'

import { ChartStore } from './chart'

export class DashboardStore {
  @observable public id: string
  @observable public charts: ChartStore[]
}
