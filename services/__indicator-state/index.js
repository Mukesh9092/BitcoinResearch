import ccxt from 'ccxt'

import { add } from './common/hemera/client'
import { log } from './common/log'

import { find, insert } from './common/influxdb/entities/indicator'
import { indicatorSchema } from './common/influxdb/schemas/indicator'
import { dateToNanoDate } from './common/influxdb/helpers'

import technicalAnalysis from './common/technical-analysis'

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

  log.debug(
    'indicator-state getExpectedLengthForPeriod',
    f,
    t,
    difference,
    result,
  )

  return result
}

async function importIndicator(name, baseKey, quoteKey, period, from, to) {
  const indicator = technicalAnalysis[name]

  if (!indicator) {
    throw new Error(`Indicator '${indicator}' not found.`)
  }

  log.debug('indicator-state importOHLCV', baseKey, quoteKey, period, from, to)

  const expectedLength = getExpectedLengthForPeriod(period, from, to)

  log.debug('indicator-state importOHLCV expectedLength', expectedLength)

  const binanceKey = `${baseKey}/${quoteKey}`

  log.debug('indicator-state importOHLCV binanceKey', binanceKey)

  const importedData = await exchange.fetchOHLCV(
    binanceKey,
    period,
    undefined,
    expectedLength,
  )

  log.debug('indicator-state importOHLCV importedData', importedData)

  const points = importedData.map((point) => {
    const [timestamp, open, high, low, close, volume] = point

    log.debug(
      'indicator-state importOHLCV import map',
      timestamp,
      open,
      high,
      low,
      close,
      volume,
    )

    return {
      measurement: indicatorSchema.measurement,
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

  log.debug('indicator-state importOHLCV import points', points)

  return points
}

async function start() {
  try {
    await add({ topic: 'Indicator', cmd: 'getIndicator' }, async (options) => {
      try {
        const { name, key, period, from, to } = options

        const [baseKey, quoteKey] = key.split('-')

        const data = await find(name, baseKey, quoteKey, period, from, to)

        log.debug('indicator-state getIndicator data', data)

        const expectedLength = getExpectedLengthForPeriod(period, from, to)

        log.debug('indicator-state getIndicator expectedLength', data)

        if (data && data.length === expectedLength) {
          return data
        }

        const points = await importIndicator(
          name,
          baseKey,
          quoteKey,
          period,
          from,
          to,
        )

        log.debug('indicator-state getIndicator import points', points)

        await insert(points)

        log.debug('indicator-state getIndicator import imported!')
      } catch (error) {
        log.error(error)
      }
    })
  } catch (error) {
    log.error(error)
  }
}

start()
