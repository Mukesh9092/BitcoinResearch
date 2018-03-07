#!/usr/bin/env bash

exec rethinkdb --bind all --driver-port ${RETHINKDB_PORT} --cluster-port ${RETHINKDB_PORT_INTRACLUSTER} --http-port ${RETHINKDB_PORT_WEB}
