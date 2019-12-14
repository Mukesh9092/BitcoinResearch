import { task } from 'mobx-task'

import { ApolloStore } from './apollo-store'

export class ApolloQueryStore extends ApolloStore {
  constructor(options) {
    super(options)

    this.gqlQuery = options.query
  }

  @task async query(options) {
    const selector = this.getSelector()

    const result = await this.apolloClient.query({
      query: this.gqlQuery,
      ...options,
    })

    return selector(result.data)
  }
}
