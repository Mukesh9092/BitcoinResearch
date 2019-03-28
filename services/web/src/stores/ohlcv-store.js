import { observable } from 'mobx'
import { task } from 'mobx-task'

import { ApolloQueryStore } from './apollo-query-store'
import { getApolloClient } from '../common/apollo/client'
import { getOHLCVs } from '../queries/getOHLCVs'

export class OHLCVStore {
  apolloClient = getApolloClient()

  @observable ohlcvs = []

  constructor(options) {
    if (options) {
      this.setFromObject(options)
    }
  }

  setFromObject(object) {
    this.ohlcvs = object
  }

  @task async fetch({ base, quote, from, to, period }) {
    const result = await this.apolloClient.query({
      query: getOHLCVs,
      variables: {
        base,
        quote,
        from,
        to,
        period,
      },
    })

    this.setFromObject(result.data.getOHLCVs)
  }
}
