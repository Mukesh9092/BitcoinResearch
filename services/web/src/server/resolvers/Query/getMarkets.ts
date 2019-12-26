const { MARKETSTORE_API_HOST, MARKETSTORE_API_PORT } = process.env

// TODO: Get from somewhere.
const quote = 'BTC'

export default async (_parent: any, _args: any, _context: any, _info: any) => {
  const host = MARKETSTORE_API_HOST
  const port = MARKETSTORE_API_PORT
  const url = `http://${host}:${port}/markets`
  // console.log('getMarkets:url', url)

  const fetchResult = await fetch(url)
  // console.log('getMarkets:fetchResult', fetchResult)

  const fetchResultText = await fetchResult.text()
  // console.log(`getMarkets:fetchResultText "${fetchResultText}"`, typeof fetchResultText)

  const fetchResultJSON = JSON.parse(fetchResultText)
  // console.log('getMarkets:fetchResultJSON', fetchResultJSON)

  const output = fetchResultJSON.map((market: string) => {
    // console.log('getMarkets:market', market)

    const [trader, pair] = market.split('_')

    // console.log('getMarkets:trader', trader)
    // console.log('getMarkets:pair', pair)

    const [base, quote] = pair.split('-')

    // console.log('getMarkets:base', base)
    // console.log('getMarkets:quote', quote)

    return {
      id: market,
      base,
      quote,
    }
  })

  // console.log('getMarkets:output', output)

  return output
}
