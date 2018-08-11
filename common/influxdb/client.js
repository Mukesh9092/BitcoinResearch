import { InfluxDB } from 'influx'

import schema from './schema'
// import { log } from '../log'

const { INFLUXDB_HOST, INFLUXDB_DATABASE, INFLUXDB_PORT } = process.env

let client

export async function getClient() {
  if (client) {
    return client
  }

  client = new InfluxDB({
    host: INFLUXDB_HOST,
    database: INFLUXDB_DATABASE,
    schema,
  })

  return client
}
