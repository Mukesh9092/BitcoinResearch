#!/usr/bin/env bash

npm install

export HOST=$INFLUXDB_CHRONOGRAF_HOST
export PORT=$INFLUXDB_CHRONOGRAF_PORT

exec /service/wait-for-it.sh \
  --strict \
  --timeout=$SERVICE_CONNECTION_TIMEOUT \
  $POSTGRES_HOST:$POSTGRES_PORT \
  -- \
    npm run start

