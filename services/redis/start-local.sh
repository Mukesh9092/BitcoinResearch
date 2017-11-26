#!/usr/bin/env bash

#source ./lib/service-env-local.sh

exec redis-server --port REDIS_PORT
