import { ApolloClient } from 'apollo-client'
import { action, observable, runInAction } from 'mobx'

import { IApolloQueryResult } from '../apollo/types/IApolloQueryResult'
import { IUser } from '../domain/types/IUser'
import { UserStore } from './user'
import { getApolloClient } from '../apollo/client'
import {
  getUserWithDashboardWithChartsWithMarketByUserId,
} from '../domain/queries/getUserWithDashboardWithChartsWithMarketByUserId'

export class ApplicationStore {
  private apolloClient: ApolloClient

  public constructor () {
    this.apolloClient = getApolloClient()
    this.user = undefined
    this.userError = undefined
    this.userState = 'pending'
  }

  @observable public title: string
  @observable public user: UserStore
  @observable public userError: string
  @observable public userState: string

  @action
  public async setUserWithDashboardWithChartsWithMarketForUserId (userId: string): Promise<void> {
    try {
      runInAction(() => {
        this.user = undefined
        this.userError = undefined
        this.userState = 'pending'
      })

      const result: IApolloQueryResult<IUser> = await this.apolloClient.query({
        query: getUserWithDashboardWithChartsWithMarketByUserId,
        variables: {
          userId,
        },
      })

      runInAction(() => {
        this.user = result.data.user
        this.userState = 'completed'
      })
    } catch (error) {
      runInAction(() => {
        this.userState = 'error'
        this.userError = error
      })
    }
  }
}
