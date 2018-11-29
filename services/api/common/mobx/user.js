import { action, observable, decorate } from 'mobx'

import { DashboardStore } from './dashboard'

export class UserStore {
  constructor(options) {
    this.id = (options && options.id) || undefined
    this.name = (options && options.name) || undefined
    this.dashboard = new DashboardStore((options && options.dashboard) || undefined)
  }
}

decorate(UserStore, {
  dashboard: observable,
  id: observable,
  name: observable,
})
