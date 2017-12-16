#!/usr/bin/env bash
exec /service/src/common/wait-for-it.sh $RETHINKDB_HOST:$RETHINKDB_PORT -- chateau -f ./config.js
