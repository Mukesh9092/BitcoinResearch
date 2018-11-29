import { action, decorate, observable, runInAction } from 'mobx'

export function apolloMutationStoreFactory(options) {
  class ApolloMutationStore {
    constructor() {
      this.apolloClient = options.apolloClient
      this.state = 'initial'
      this.result = []
      this.error = undefined
    }

    async mutate(mutationOptions) {
      try {
        runInAction(() => {
          this.result = undefined
          this.error = undefined
          this.state = 'pending'
        })

        const result = await this.apolloClient.mutate(mutationOptions)

        runInAction(() => {
          this.state = 'completed'
          this.result = result.data[options.propertyName]
        })
      } catch (error) {
        runInAction(() => {
          this.state = 'error'
          this.error = error
        })

        throw error
      }
    }
  }

  decorate(ApolloMutationStore, {
    error: observable,
    mutate: action,
    result: observable,
    state: observable,
  })

  return new ApolloMutationStore()
}
