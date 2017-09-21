#!/usr/bin/env bash

source ./lib/service-env-local.sh

#exec redis-commander --redis-host 0.0.0.0 --redis-port 6379 --port 8201 --address 0.0.0.0

# Hack.
rm -rf ~/.redis-commander

exec redis-commander
