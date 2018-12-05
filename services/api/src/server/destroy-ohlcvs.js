import { getApolloClient } from '../../common/apollo/client'
import { deleteManyOHLCVs } from '../../common/domain/mutations/deleteManyOHLCVs'

export async function destroyOHLCVs(market, period, from, to) {
  // console.log('destroyOHLCVs', market, period, from, to)

  const apolloClient = getApolloClient()

  const queryVariables = {
    from,
    marketBase: market.base,
    marketQuote: market.quote,
    period,
    to,
  }

  const result = await apolloClient.mutate({
    mutation: deleteManyOHLCVs,
    variables: queryVariables,
  })

  return result
}
