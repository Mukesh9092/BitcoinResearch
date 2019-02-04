import fetch from 'cross-fetch'
import msgpack from 'msgpack'
import uuid from 'uuid'

import { periodToMarketStore } from '../../../common/ohlcv'

const { MARKETSTORE_HOST, MARKETSTORE_PORT, MARKETSTORE_API_HOST, MARKETSTORE_API_PORT } = process.env

function sanitizeDateForMarketStore(isoDateTime) {
  return new Date(isoDateTime / 1000)
}

export const getOHLCVs = async (_, args, context, info) => {
  const host = MARKETSTORE_API_HOST
  const port = MARKETSTORE_API_PORT
  const { base, from, to } = args
  const period = periodToMarketStore(args.period)
  const url = `http://${host}:${port}/query/${base}/${period}/OHLCV/${from}/${to}`

  const fetchResult = await fetch(url)
  const fetchResultJSON = await fetchResult.json()

  const openKeys = Object.keys(fetchResultJSON.Open).sort()

  return openKeys.map((key) => {
    return {
      datetime: new Date(Number(key)),
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
export const getOHLCVs = async (_, args, context, info) => {
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
