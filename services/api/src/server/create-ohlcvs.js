import { getApolloClient } from '../common/apollo/client'
import { createUpsertOHLCVs } from '../common/domain/mutations/createUpsertOHLCV'

export async function createOHLCVs(market, period, ohlcvs) {
  // console.log('createOHLCVs', market, period, ohlcvs.length)

  const apolloClient = getApolloClient()

  await apolloClient.mutate({
    mutation: createUpsertOHLCVs(ohlcvs),
  })
}