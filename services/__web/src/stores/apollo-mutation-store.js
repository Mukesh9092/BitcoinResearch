import { task } from 'mobx-task'

import { ApolloStore } from './apollo-store'

export class ApolloMutationStore extends ApolloStore {
  constructor(options) {
    super(options)

    this.gqlMutation = options.query
  }

  @task async mutate(options) {
    const selector = this.getSelector()

    const result = await this.apolloClient.mutate({
      mutation: this.gqlMutation,
      ...options,
    })

    return selector(result.data)
  }
}
