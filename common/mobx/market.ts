import { observable } from 'mobx'

export class MarketStore {
  @observable public id: string
  @observable public trader: string
  @observable public active: string
  @observable public category: string
  @observable public type: string
  @observable public base: string
  @observable public quote: string
  @observable public maker: string
  @observable public taker: string
  @observable public precisionBase: string
  @observable public precisionQuote: string
  @observable public precisionAmount: string
  @observable public precisionPrice: string
}
