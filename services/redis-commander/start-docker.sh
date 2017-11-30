#!/usr/bin/env bash
exec redis-commander --redis-host ${REDIS_HOST} --redis-port ${REDIS_PORT} --port ${REDIS_COMMANDER_PORT} --address ${REDIS_COMMANDER_HOST}
