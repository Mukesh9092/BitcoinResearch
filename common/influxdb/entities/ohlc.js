import { FieldType, toNanoDate } from 'influx'

import { log } from '../../../common/log'

import getClient from '../client'
import { returnChartData } from '../../poloniex/client'

const ENTITY_NAME = 'ohlc'

export const ohlcSchema = {
  measurement: ENTITY_NAME,
  tags: ['currencyAKey', 'currencyBKey', 'period'],
  fields: {
    open: FieldType.FLOAT,
    close: FieldType.FLOAT,
    high: FieldType.FLOAT,
    low: FieldType.FLOAT,
    volume: FieldType.FLOAT,
  },
}

export const findByMarketAndPeriodBetweenStartAndEnd = async (
  currencyAKey,
  currencyBKey,
  period,
  start,
  end,
) => {
  try {
    log.debug(
      'influxdb entities ohlc findByMarketAndPeriodBetweenStartAndEnd',
      currencyAKey,
      currencyBKey,
      period,
      start,
      end,
    )

    const client = await getClient()

    const startNano = toNanoDate(String(start)).getNanoTime()
    const endNano = toNanoDate(String(end)).getNanoTime()

    const result = await client.query(`
      SELECT * FROM ${ENTITY_NAME}
      WHERE
        currencyAKey = '${currencyAKey}' AND
        currencyBKey = '${currencyBKey}' AND
        period       = '${period}'       AND
        time        >= ${startNano}      AND
        time        <= ${endNano}
      ORDER BY time ASC
    `)

    return result
  } catch (error) {
    throw error
  }
}

const sanitizeAPIChartDataJSON = (a, currencyAKey, currencyBKey, period) => {
  return a.map((x) => {
    return {
      measurement: ohlcSchema.measurement,
      timestamp: x.date * 1000 * 1000 * 1000,
      tags: {
        currencyAKey,
        currencyBKey,
        period,
      },
      fields: {
        open: x.open,
        close: x.close,
        high: x.high,
        low: x.low,
        volume: x.volume,
        quoteVolume: x.quoteVolume,
        weightedAverage: x.weightedAverage,
      },
    }
  })
}

export const importForMarketAndPeriodBetweenStartAndEnd = async (
  currencyAKey,
  currencyBKey,
  period,
  start,
  end,
) => {
  try {
    log.debug(
      'influxdb entities ohlc importForMarketAndPeriodBetweenStartAndEnd',
      currencyAKey,
      currencyBKey,
      period,
      start,
      end,
    )

    const client = await getClient()

    // TODO: Don't fetch data here. It should not happen in the InfluxDB client
    //       but rather in the controlling service and passed to here.
    const apiResultJSON = await returnChartData(
      currencyAKey,
      currencyBKey,
      period,
      start / 1000 / 1000 / 1000,
      end / 1000 / 1000 / 1000,
    )

    // TODO: The same for sanitization; it's the service's job.
    const data = sanitizeAPIChartDataJSON(
      apiResultJSON,
      currencyAKey,
      currencyBKey,
      period,
    )

    await client.writePoints(data)
  } catch (error) {
    throw error
  }
}
