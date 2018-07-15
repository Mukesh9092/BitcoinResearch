#!/usr/bin/env bash

exec ./common/wait-for-it.sh \
  --strict \
  --timeout=$SERVICE_CONNECTION_TIMEOUT \
  $REDIS_HOST:$REDIS_PORT \
  -- \
    redis-commander \
      --redis-host ${REDIS_HOST} \
      --redis-port ${REDIS_PORT} \
      --address ${REDIS_ADMIN_HOST} \
      --port ${REDIS_ADMIN_PORT}
