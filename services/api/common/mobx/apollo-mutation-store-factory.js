import { action, observable, runInAction } from 'mobx'

import { getApolloClient } from '../apollo/client'

export function apolloMutationStoreFactory(options) {
  class ApolloMutationStore {
    apolloClient = getApolloClient()

    @observable state = 'initial'

    @observable error

    @observable result

    static defaultSelector(data) {
      return data[Object.keys(data)[0]]
    }

    @action async mutate(mutationOptions) {
      try {
        runInAction(() => {
          this.state = 'pending'
          this.error = undefined
          this.result = undefined
        })

        const result = await this.apolloClient.mutate({
          mutation: options.mutation,
          ...mutationOptions,
        })

        runInAction(() => {
          this.state = 'completed'
          this.error = undefined
          this.result = (options?.selector || ApolloMutationStore.defaultSelector)(result.data)
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

  return new ApolloMutationStore()
}
