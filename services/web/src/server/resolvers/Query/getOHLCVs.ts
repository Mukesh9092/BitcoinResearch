import { periodToMarketStore } from '../../../common/ohlcv'

const host = String(process.env.MARKETSTORE_API_HOST)
const port = Number(process.env.MARKETSTORE_API_PORT)

export default async (_parent: any, args: any, _context: any, _info: any) => {
  const { base, from, to } = args
  const period = periodToMarketStore(args.period)
  const url = `http://${host}:${port}/query/${base}/${period}/OHLCV/${from}/${to}`

  const fetchResult = await fetch(url)
  // debug('getOHLCVs fetchResult', fetchResult)

  const fetchResultText = await fetchResult.text()
  // debug(`getOHLCVs fetchResultText "${fetchResultText}"`, typeof fetchResultText)

  const fetchResultJSON = JSON.parse(fetchResultText)
  // debug('getOHLCVs fetchResultJSON', fetchResultJSON)

  const openKeys = Object.keys(fetchResultJSON.Open).sort()
  // debug('getOHLCVs openKeys', openKeys)

  return openKeys.map((key) => {
    return {
      datetime: new Date(key),
      base: args.base,
      quote: args.quote,
      period: args.period,
      open: fetchResultJSON.Open[key],
      high: fetchResultJSON.High[key],
      low: fetchResultJSON.Low[key],
      close: fetchResultJSON.Close[key],
      volume: fetchResultJSON.Volume[key],
    }
  })
}

/*
import fetch from 'cross-fetch'
import msgpack from 'msgpack'
import uuid from 'uuid'

export const getOHLCVs = async (root, args, context, info) => {
  const host = MARKETSTORE_HOST
  const port = MARKETSTORE_PORT
  const { base, from, to } = args
  const period = periodToMarketStore(args.period)
  const type = 'OHLCV'
  const url = `http://${host}:${port}/rpc`

  const message = msgpack.pack({
    requests: [
      {
        method: 'DataService.Query',
        id: uuid(),
        jsonrpc: '2.0',
        params: {
          destination: `${base}/${period}/${type}`,
          // key_category
          epoch_start: from,
          epoch_end: to,
          // limit_record_count:
          // limit_from_start:
          // functions:
        },
      },
    ],
  })

  console.log('message', message)

  const options = {
    method: 'POST',
    body: message,
    headers: { 'Content-Type': 'application/json' },
  }

  console.log('options', options)

  const fetchResult = await fetch(url, options)

  console.log('fetchResult', fetchResult)

  const fetchResultJSON = await fetchResult.text()

  console.log('fetchResultJSON', typeof fetchResultJSON, fetchResultJSON)

  const openKeys = Object.keys(fetchResultJSON.Open).sort()

  const result = []

  openKeys.forEach((key) => {
    result.push({
      datetime: new Date(key),
      base: args.base,
      quote: args.quote,
      period: args.period,
      open: fetchResultJSON.Open[key],
      high: fetchResultJSON.High[key],
      low: fetchResultJSON.Low[key],
      close: fetchResultJSON.Close[key],
      volume: fetchResultJSON.Volume[key],
    })
  })

  return result
}
 */
