import { periodToMarketStore } from '../../../common/ohlcv'
import { debug } from '../../../common/log'

const { MARKETSTORE_API_HOST, MARKETSTORE_API_PORT } = process.env

// TODO: Get from somewhere.
const base = 'BTC'

export const getMarkets = async (_, args, context, info) => {
  const host = MARKETSTORE_API_HOST
  const port = MARKETSTORE_API_PORT
  const url = `http://${host}:${port}/markets`

  const fetchResult = await fetch(url)
  // debug('getMarkets fetchResult', fetchResult)

  const fetchResultText = await fetchResult.text()
  // debug(`getMarkets fetchResultText "${fetchResultText}"`, typeof fetchResultText)

  const fetchResultJSON = JSON.parse(fetchResultText)
  // debug('getMarkets fetchResultJSON', fetchResultJSON)

  const output = fetchResultJSON.map((quote) => {
    return {
      base,
      quote,
    }
  })
  // debug('getMarkets output', output)

  return output
}
