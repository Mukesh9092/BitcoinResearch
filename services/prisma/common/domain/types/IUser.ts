import { IDashboard } from './IDashboard'

export interface IUser {
  id?: string
  name: string
  dashboard: IDashboard
}
