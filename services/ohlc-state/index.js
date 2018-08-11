import ccxt from 'ccxt'

import { add } from './common/hemera/client'
import { log } from './common/log'

import { find, insert } from './common/influxdb/entities/ohlc'
import { ohlcSchema } from './common/influxdb/schemas/ohlc'
import { dateToNanoDate } from './common/influxdb/helpers'

log.setLevel('debug')

// Because classes should start with an uppercase letter.
const Binance = ccxt.binance

const exchange = new Binance({ id: 'binance1' })

function periodToMilliseconds(period) {
  const [_, amount, timeframe] = period.match(/(\d+)([wdhm])/)

  let result = amount * 1000

  if (timeframe === 'm') {
    result *= 60
  }

  if (timeframe === 'h') {
    result *= 60 * 60
  }

  if (timeframe === 'd') {
    result *= 60 * 60 * 24
  }

  if (timeframe === 'w') {
    result *= 60 * 60 * 24 * 7
  }

  return result
}

function getExpectedLengthForPeriod(period, from, to) {
  const f = new Date(from).valueOf()
  const t = new Date(to).valueOf()

  const difference = t - f

  const result = difference / periodToMilliseconds(period)

  log.debug('ohlc-state getExpectedLengthForPeriod', f, t, difference, result)

  return result
}

async function importOHLCV(baseKey, quoteKey, period, from, to) {
  log.debug('ohlc-state importOHLCV', baseKey, quoteKey, period, from, to)

  const expectedLength = getExpectedLengthForPeriod(period, from, to)

  log.debug('ohlc-state importOHLCV expectedLength', expectedLength)

  const binanceKey = `${baseKey}/${quoteKey}`

  log.debug('ohlc-state importOHLCV binanceKey', binanceKey)

  const importedData = await exchange.fetchOHLCV(
    binanceKey,
    period,
    undefined,
    expectedLength,
  )

  log.debug('ohlc-state importOHLCV importedData', importedData)

  const points = importedData.map((point) => {
    const [timestamp, open, high, low, close, volume] = point

    log.debug(
      'ohlc-state importOHLCV import map',
      timestamp,
      open,
      high,
      low,
      close,
      volume,
    )

    return {
      measurement: ohlcSchema.measurement,
      timestamp: dateToNanoDate(timestamp).getNanoTime(),
      tags: {
        baseKey,
        quoteKey,
        period,
      },
      fields: {
        open,
        high,
        low,
        close,
        volume,
      },
    }
  })

  log.debug('ohlc-state importOHLCV import points', points)

  return points
}

async function start() {
  try {
    await add({ topic: 'OHLC', cmd: 'getOHLC' }, async (options) => {
      try {
        const { key, period, from, to } = options

        const [baseKey, quoteKey] = key.split('-')

        const data = await find(baseKey, quoteKey, period, from, to)

        log.debug('ohlc-state getOHLC data', data)

        const expectedLength = getExpectedLengthForPeriod(period, from, to)

        log.debug('ohlc-state getOHLC expectedLength', data)

        if (data && data.length === expectedLength) {
          return data
        }

        const points = await importOHLCV(baseKey, quoteKey, period, from, to)

        log.debug('ohlc-state getOHLC import points', points)

        await insert(points)

        log.debug('ohlc-state getOHLC import imported!')
      } catch (error) {
        log.error(error)
      }
    })
  } catch (error) {
    log.error(error)
  }
}

start()
