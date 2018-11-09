import { action, observable } from 'mobx'

import { DashboardStore } from './dashboard'

export class UserStore {
  @observable public id: string
  @observable public name: string
  @observable public dashboard: DashboardStore
}
