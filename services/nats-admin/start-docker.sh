#!/usr/bin/env bash

exec /service/common/wait-for-it.sh \
  --strict \
  --timeout=$SERVICE_CONNECTION_TIMEOUT \
  $REDIS_HOST:$REDIS_PORT \
  -- \
    natsboard \
      --nats-mon-url http://${NATS_HOST}:${NATS_HTTP_PORT} \
