import { log } from '../../common/log'
import { find, upsert } from '../../common/database/repositories/line-indicator'
import { getExpectedLengthForPeriod } from '../../common/ohlcv'

import apiKeys from '../../apiKeys'

export default async function getLineIndicator(obj, args) {
  try {
    const { trader, base, quote, period, from, to } = args
    let data

    // - Calculate expected data set length for period and start and end.
    const expectedLength = getExpectedLengthForPeriod(period, from, to)

    log.debug('getLineIndicator expectedLength', expectedLength)

    // - Query from DB.
    data = await find(trader, base, quote, period, from, to)

    log.debug('getOHLCV data', data.length)

    // - Compare result length to expected length.
    // - If equal serve it.
    if (data && data.length === expectedLength) {
      return data
    }

    // - Get Indicator inputs.
    // - Calculate OHLCV from/to.
    // - Get OHLCV data.
    // - Calculate Indicator data.
    // - Insert into DB.
    // - Query from DB.
    // - Serve it.

    return []
  } catch (error) {
    log.error(error)
    throw error
  }
}

/*
Hi. I am serving financial charts over GraphQL (with a React Server Side Rendering app).

I have the types:

```
  type OHLCV {
    timestamp: Date!
    open: Float!
    high: Float!
    low: Float!
    close: Float!
    volume: Float
  }

  type PointIndicator {
    timestamp: Date!
    value: Float!
  }

  type LineIndicator {
    timestamp: Date!
    value: Float!
  }

  type BandIndicator {
    timestamp: Date!
    upper: Float!
    middle: Float!
    lower: Float!
  }

  type RootQuery {
    market: Market
    markets: [Market]
    orderBook(key: String!): OrderBook
    getOHLCV(trader: String!, base: String!, quote: String!, period: String!, from: Date!, to: Date!): [OHLCV]
    getPointIndicator(trader: String!, name: String!, base: String!, quote: String!, period: String!, from: Date!, to: Date!): [PointIndicator]
    getLineIndicator(trader: String!, name: String!, base: String!, quote: String!, period: String!, from: Date!, to: Date!): [LineIndicator]
    getBandIndicator(trader: String!, name: String!, base: String!, quote: String!, period: String!, from: Date!, to: Date!): [BandIndicator]
  }
```


 */
