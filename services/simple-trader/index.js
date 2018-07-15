import ccxt from 'ccxt'
import tulind from 'tulind'
import JSONStream from 'JSONStream'
import { createReadStream, createWriteStream } from 'fs'

import { log } from '../../common/log'

log.setLevel('debug')

// var close = [4,5,6,6,6,5,5,5,6,4];
//
// tulind.indicators.sma.indicator([close], [3], (err, results) => {
//   console.log("Result of sma is:");
//   console.log(results[0]);
// });

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

let smaShort
const smaShortLength = 7

let smaLong
const smaLongLength = 20

let emaShort
const emaShortLength = 7

let emaLong
const emaLongLength = 20

let exchange
let ohlcv
let ohlcvAsArrays
let resultSet

function resolveCallbackWith(fn, ...args) {
  return new Promise((resolve, reject) => {
    fn(...args, (error, result) => {
      if (error) {
        return reject(error)
      }

      return resolve(result)
    })
  })
}

async function getOHLCV() {
  try {
    const result = await exchange.fetchOHLCV(
      MARKET_SYMBOL,
      TIMEFRAME,
      undefined,
      UPDATE_BAR_COUNT,
    )
    return ohlcv.slice(UPDATE_BAR_COUNT, ohlcv.length).concat(result)
  } catch (error) {
    log.error(error)
  }
}

function getOHLCVAsArrays(pairs) {
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

async function getIndicator(name, ...args) {
  try {
    const result = tulind.indicators[name]

    if (!result) {
      return
    }

    return (await resolveCallbackWith(result.indicator, ...args))[0]
  } catch (error) {
    log.error(error)
  }
}

async function updateValues() {
  ohlcvAsArrays = getOHLCVAsArrays(ohlcv)

  smaShort = await getIndicator('sma', [ohlcvAsArrays.close], [smaShortLength])
  smaLong = await getIndicator('sma', [ohlcvAsArrays.close], [smaLongLength])
  emaShort = await getIndicator('ema', [ohlcvAsArrays.close], [emaShortLength])
  emaLong = await getIndicator('ema', [ohlcvAsArrays.close], [emaLongLength])

  // log.debug('ohlcv', ohlcvAsArrays.close.length)
  // log.debug('smaShort', smaShort.length)
  // log.debug('smaLong', smaLong.length)
  // log.debug('emaShort', emaShort.length)
  // log.debug('emaLong', emaLong.length)

  resultSet = ohlcv.map((x, i) => {
    // log.debug('smaShort', ohlcv.length, i, ohlcv[i], smaShort[i])
    // log.debug('emaShort', smaShort[i])

    // log.debug('smaLong', smaLong[i])
    // log.debug('emaLong', smaLong[i])

    const output = {
      timestamp: x[0],
      open: x[1],
      high: x[2],
      low: x[3],
      close: x[4],
      volume: x[5],
    }

    if (i > smaShortLength) {
      output.smaShort = smaShort[i - smaShortLength]
    }

    if (i > smaLongLength) {
      output.smaLong = smaLong[i - smaLongLength]
    }

    if (i > emaShortLength) {
      output.emaShort = emaShort[i - emaShortLength]
    }

    if (i > emaLongLength) {
      output.emaLong = emaLong[i - emaLongLength]
    }

    return output
  })
}

async function start() {
  try {
    const inputStream = JSONStream.stringify()
    const outputStream = createWriteStream(`${__dirname}/output.json`)

    inputStream.pipe(outputStream)

    exchange = new Binance({ id: 'binance1' })

    ohlcv = await exchange.fetchOHLCV(
      MARKET_SYMBOL,
      TIMEFRAME,
      undefined,
      DATA_SET_SIZE + LARGEST_INDICATOR_DATA_SET_SIZE,
    )

    await updateValues()

    resultSet.forEach((x) => {
      log.debug('writing', x)

      inputStream.write(x)
    })

    setInterval(async () => {
      try {
        ohlcv = await getOHLCV()

        await updateValues()

        log.debug('writing', resultSet[resultSet.length - 1])

        inputStream.write(resultSet[resultSet.length - 1])
      } catch (error) {
        log.error(error)
      }
    }, UPDATE_INTERVAL_MILLISECONDS)
  } catch (error) {
    log.error(error)
  }
}

start()
