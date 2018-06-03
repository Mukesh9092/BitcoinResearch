#!/usr/bin/env bash

exec /service/wait-for-it.sh \
  --strict \
  --timeout=$SERVICE_CONNECTION_TIMEOUT \
  $NATS_HOST:$NATS_PORT \
  -- \
    natsboard \
      --nats-mon-url http://${NATS_HOST}:${NATS_HTTP_PORT} \
