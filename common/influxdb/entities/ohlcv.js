import { FieldType, toNanoDate } from 'influx'

import { log } from '../../../common/log'

import { getClient } from '../client'
import { dateToNanoDate } from '../helpers'

import { ohlcvSchema } from '../schemas/ohlcv'

export async function find(baseKey, quoteKey, period, from, to) {
  log.debug('influxdb entities ohlcv find', baseKey, quoteKey, period, from, to)

  const client = await getClient()

  log.debug('influxdb entities ohlcv find client', client)

  const fromNanoTime = dateToNanoDate(new Date(from)).getNanoTime()
  const toNanoTime = dateToNanoDate(new Date(to)).getNanoTime()

  log.debug('influxdb entities ohlcv find fromNanoTime', fromNanoTime)
  log.debug('influxdb entities ohlcv find toNanoTime', toNanoTime)

  const result = await client.query(`
    SELECT * FROM ${ohlcvSchema.measurement}
    WHERE
      baseKey      = '${baseKey}'    AND
      quoteKey     = '${quoteKey}'   AND
      period       = '${period}'     AND
      time        >= ${fromNanoTime} AND
      time        <= ${toNanoTime}
    ORDER BY time ASC
  `)

  log.debug('influxdb entities ohlcv find result', result)

  return result
}

export async function insert(points) {
  log.debug('influxdb entities ohlcv insert', points)

  const client = await getClient()

  log.debug('influxdb entities ohlcv insert client', client)

  await client.writePoints(points)
}
