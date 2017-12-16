#!/usr/bin/env bash
#exec redis-commander --redis-host ${REDIS_HOST} --redis-port ${REDIS_PORT} --port ${REDIS_COMMANDER_PORT} --address ${REDIS_COMMANDER_HOST}

exec /service/src/common/wait-for-it.sh --strict --timeout=$SERVICE_CONNECTION_TIMEOUT $REDIS_HOST:$REDIS_PORT -- redis-commander --redis-host ${REDIS_HOST} --redis-port ${REDIS_PORT} --port ${REDIS_COMMANDER_PORT} --address ${REDIS_COMMANDER_HOST}
