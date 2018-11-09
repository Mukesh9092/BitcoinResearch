import { IChart } from './IChart'
import { IUser } from './IUser'

export interface IDashboard {
  id?: string
  user?: IUser
  charts: IChart[]
}
