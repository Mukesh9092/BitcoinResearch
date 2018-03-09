import { InfluxDB } from 'influx';

import schema from './schema';

const { INFLUXDB_HOST, INFLUXDB_DATABASE, INFLUXDB_PORT } = process.env;

let client: InfluxDB;

export default async () => {
  try {
    if (client) {
      return client;
    }

    client = new InfluxDB({
      host: String(INFLUXDB_HOST),
      database: String(INFLUXDB_DATABASE),
      schema,
    });

    return client;
  } catch (error) {
    throw error;
  }
};
