import { getApolloClient } from '../common/apollo/client'

export class ApolloStore {
  apolloClient = getApolloClient()

  constructor(options = {}) {
    if (options.selector) {
      this.selector = options.selector
    }
  }

  static defaultSelector(data) {
    return data[Object.keys(data)[0]]
  }

  getSelector() {
    return this.selector || this.defaultSelector
  }
}
