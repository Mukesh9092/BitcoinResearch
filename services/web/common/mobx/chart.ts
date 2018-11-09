import { observable } from 'mobx'

import { MarketStore } from './market'

export class ChartStore {
  @observable public id: string
  @observable public market: MarketStore
}
