import { IDashboard } from './IDashboard'
import { IMarket } from './IMarket'

export interface IChart {
  id?: string
  dashboard?: IDashboard
  market: IMarket
}
