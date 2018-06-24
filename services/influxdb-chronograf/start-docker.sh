#!/usr/bin/env bash

npm install

export HOST=$INFLUXDB_CHRONOGRAF_HOST
export PORT=$INFLUXDB_CHRONOGRAF_PORT

exec ./common/wait-for-it.sh \
  --strict \
  --timeout=$SERVICE_CONNECTION_TIMEOUT \
  $INFLUXDB_HOST:$INFLUXDB_PORT \
  -- \
    npm run start

