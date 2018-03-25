#!/usr/bin/env bash

npm install

exec /service/common/wait-for-it.sh \
  --strict \
  --timeout=$SERVICE_CONNECTION_TIMEOUT \
  $POSTGRES_HOST:$POSTGRES_PORT \
  -- \
    npm run dev $API_SERVICE_NAME

