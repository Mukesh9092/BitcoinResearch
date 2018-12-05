import { getApolloClient } from '../../common/apollo/client'
import { createOHLCV } from '../../common/domain/mutations/createOHLCV'

export async function createOHLCVs(market, period, ohlcvs) {
  // console.log('createOHLCVs', market, period, ohlcvs.length)

  const apolloClient = getApolloClient()

  await Promise.all(
    ohlcvs.map((oHLCV) => {
      const [timestamp, open, high, low, close, volume] = oHLCV

      const variables = {
        close,
        high,
        low,
        marketBase: market.base,
        marketQuote: market.quote,
        open,
        period,
        timestamp: new Date(timestamp).toISOString(),
        volume,
      }

      return apolloClient.mutate({
        mutation: createOHLCV,
        variables,
      })
    }),
  )
}
