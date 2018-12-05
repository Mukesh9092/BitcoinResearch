import { action, observable, runInAction } from 'mobx'

import { getApolloClient } from '../apollo/client'

export function apolloQueryStoreFactory(options) {
  class ApolloQueryStore {
    apolloClient = getApolloClient()

    @observable state = 'initial'

    @observable error

    @observable result

    static defaultSelector(data) {
      return data[Object.keys(data)[0]]
    }

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
          this.state = 'completed'
          this.result = (options?.selector || ApolloQueryStore.defaultSelector)(result.data)
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
