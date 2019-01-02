import { getApolloClient } from '../common/apollo/client'
import { createUpsertOHLCVs } from '../common/domain/mutations/createUpsertOHLCV'

export async function createOHLCVs(ohlcvs) {
  const apolloClient = getApolloClient()

  await apolloClient.mutate({
    mutation: createUpsertOHLCVs(ohlcvs),
  })
}
