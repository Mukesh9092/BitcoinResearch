#!/usr/bin/env bash
npm install
npm run typescript-watch&
exec /service/src/common/wait-for-it.sh --strict --timeout=$SERVICE_CONNECTION_TIMEOUT $RETHINKDB_HOST:$RETHINKDB_PORT -- npm run dev

