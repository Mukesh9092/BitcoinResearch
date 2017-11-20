#!/usr/bin/env bash

source ./lib/service-env-local.sh

# Hack.
rm -rf ~/.redis-commander

exec redis-commander --redis-host REDIS_HOST --redis-port REDIS_PORT --port REDIS_COMMANDER_PORT --address REDIS_COMMANDER_HOST
