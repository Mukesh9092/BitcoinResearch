#!/usr/bin/env bash

source ./lib/service-env-local.sh

exec rethinkdb -d data --bind all --driver-port 8102 --cluster-port 8103 --http-port 8203
