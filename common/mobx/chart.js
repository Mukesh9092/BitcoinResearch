import { observable, decorate } from 'mobx'

import { MarketStore } from './market'

export class ChartStore {
  constructor(data) {
    this.id = data.id || undefined
    this.market = new MarketStore(data.market || undefined)
  }
}

decorate(ChartStore, {
  id: observable,
  market: observable,
})
