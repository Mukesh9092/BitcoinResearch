import { observable } from 'mobx'
import { task } from 'mobx-task'

import { getApolloClient } from '../common/apollo/client'
import { getCurrentUser } from '../queries/getCurrentUser'

export class UserStore {
  apolloClient = getApolloClient()

  @observable id

  @observable name

  constructor(options) {
    if (options) {
      this.setFromObject(options)
    }
  }

  setFromObject(object) {
    this.id = object.id
    this.name = object.name
  }

  @task async fetch() {
    const result = await this.apolloClient.query({
      query: getCurrentUser,
    })

    this.setFromObject(result.data.getCurrentUser)
  }
}
