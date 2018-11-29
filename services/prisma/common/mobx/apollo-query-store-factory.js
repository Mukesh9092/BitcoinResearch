import { DocumentNode } from 'graphql'
import { action, observable, runInAction } from 'mobx'

import { getApolloClient } from '../apollo/client'

export function apolloQueryStoreFactory(options) {
  class ApolloQueryStore {
    apolloClient = getApolloClient()

    @observable state = 'initial'

    @observable error

    @observable result

    @action async query(queryOptions) {
      try {
        runInAction(() => {
          this.state = 'pending'
          this.error = undefined
          this.result = undefined
        })

        const result = await this.apolloClient.query({
          query: options.query,
          ...queryOptions,
        })

        runInAction(() => {
          const key = Object.keys(result.data)[0]

          this.state = 'completed'
          this.result = result.data[key]
          this.error = undefined
        })
      } catch (error) {
        runInAction(() => {
          this.state = 'error'
          this.error = error
          this.result = undefined
        })

        throw error
      }
    }
  }

  return new ApolloQueryStore()
}
