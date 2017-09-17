#!/usr/bin/env bash

source ./lib/service-env-local.sh

exec nginx -c $(pwd)/nginx.local.conf
