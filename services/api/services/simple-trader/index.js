import ccxt from 'ccxt'
import ta from 'talib/build/Release/talib.node'

import { log } from '../../common/log'

// Because this API doesn't like linting tools.
const Binance = ccxt.binance

// How many candles to load
const DATA_SET_SIZE = 100

// How many candles to load extra in order to calculate the first indicator
// value correctly.
const LARGEST_INDICATOR_DATA_SET_SIZE = 20

// The market to load
const MARKET_SYMBOL = 'ETH/BTC'

// The timeframe to load
const TIMEFRAME = '1m'

// Amount of bars to request each update
const UPDATE_BAR_COUNT = 2

// Interval to request each update at.
const UPDATE_INTERVAL_MILLISECONDS = 1000 * 2

let exchange
let ohlcv
let smaShort
let smaLong
let emaShort
let emaLong

function peek(array) {
  return array[array.length - 1]
}

function ohlcvAsTALib(pairs) {
  return {
    open: pairs.map((entry) => {
      return entry[1]
    }),

    high: pairs.map((entry) => {
      return entry[2]
    }),

    low: pairs.map((entry) => {
      return entry[3]
    }),

    close: pairs.map((entry) => {
      return entry[4]
    }),

    volume: pairs.map((entry) => {
      return entry[5]
    }),
  }
}

async function getOHLCV() {
  try {
    const result = await exchange.fetchOHLCV(
      MARKET_SYMBOL,
      TIMEFRAME,
      undefined,
      UPDATE_BAR_COUNT,
    )
    return ohlcv.slice(0, ohlcv.length - UPDATE_BAR_COUNT).concat(result)
  } catch (error) {
    log.error(error)
  }
}

async function getSMA(timePeriod) {
  try {
    const set = ohlcv.slice(ohlcv.length - timePeriod)

    const product = set.reduce((m, [time, high, low, open, close, volume]) => {
      return m + close
    }, 0)

    const result = product / timePeriod

    return result
  } catch (error) {
    log.error(error)
  }
}

let lastEMA
async function getEMA(timePeriod) {
  try {
    const multiplier = 2 / (timePeriod + 1)

    log.debug('multiplier')

    const { close } = ohlcv[ohlcv.length - 1]

    const ema = close * multiplier + (lastEMA || close) * (1 - multiplier)

    lastEMA = ema

    return ema
  } catch (error) {
    log.error(error)
  }
}

async function getBollingerBand(timePeriod) {
  try {
    const data = ohlcvAsTALib(ohlcv)

    return await new Promise((resolve, reject) => {
      ta.execute(
        {
          name: 'BBANDS',
          startIdx: 0,
          endIdx: data.close.length - 1,
          inReal: data.close,
          optInTimePeriod: timePeriod,
          optInNbDevUp: 2,
          optInNbDevDn: 2,
          optInMAType: 0,
        },
        (error, result) => {
          if (error) {
            return reject(error)
          }
          return resolve(result.result)
        },
      )
    })
  } catch (error) {
    log.error(error)
  }
}

async function start() {
  try {
    exchange = new Binance({ id: 'binance1' })

    ohlcv = await exchange.fetchOHLCV(
      MARKET_SYMBOL,
      TIMEFRAME,
      undefined,
      DATA_SET_SIZE + LARGEST_INDICATOR_DATA_SET_SIZE,
    )

    setInterval(async () => {
      try {
        ohlcv = await getOHLCV()
        smaShort = await getSMA(7)
        emaShort = await getEMA(7)

        // log.debug('smaShort', smaShort)

        log.debug('emaShort', emaShort)
      } catch (error) {
        log.error(error)
      }
    }, UPDATE_INTERVAL_MILLISECONDS)
  } catch (error) {
    log.error(error)
  }
}

start()
