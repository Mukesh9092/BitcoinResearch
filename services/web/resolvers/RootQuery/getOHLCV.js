import ccxt from 'ccxt'

import { log } from '../../common/log'

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

  log.debug('ohlcv-state getExpectedLengthForPeriod', f, t, difference, result)

  return result
}

async function importOHLCV(baseKey, quoteKey, period, from, to) {
  log.debug('ohlcv-state importOHLCV', baseKey, quoteKey, period, from, to)

  const expectedLength = getExpectedLengthForPeriod(period, from, to)

  log.debug('ohlcv-state importOHLCV expectedLength', expectedLength)

  const binanceKey = `${baseKey}/${quoteKey}`

  log.debug('ohlcv-state importOHLCV binanceKey', binanceKey)

  const importedData = await exchange.fetchOHLCV(
    binanceKey,
    period,
    undefined,
    expectedLength,
  )

  log.debug('ohlcv-state importOHLCV importedData', importedData)

  const points = importedData.map((point) => {
    const [timestamp, open, high, low, close, volume] = point

    log.debug(
      'ohlcv-state importOHLCV import map',
      timestamp,
      open,
      high,
      low,
      close,
      volume,
    )

    return {
      measurement: ohlcvSchema.measurement,
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

  log.debug('ohlcv-state importOHLCV import points', points)

  return points
}

export default async function getOHLCV(obj, args) {
  try {
    const { key, period, from, to } = args

    const [baseKey, quoteKey] = key.split('-')

    const data = await find(baseKey, quoteKey, period, from, to)

    log.debug('ohlcv-state getOHLCV data', data)

    const expectedLength = getExpectedLengthForPeriod(period, from, to)

    log.debug('ohlcv-state getOHLCV expectedLength', data)

    if (data && data.length === expectedLength) {
      return data
    }

    const points = await importOHLCV(baseKey, quoteKey, period, from, to)

    log.debug('ohlcv-state getOHLCV import points', points)

    await insert(points)

    log.debug('ohlcv-state getOHLCV import imported!')
  } catch (error) {
    log.error(error)
    throw error
  }
}
