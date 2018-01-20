#!/usr/bin/env bash
npm install
#npm run typescript-build
npm run typescript-watch&
exec /service/src/common/wait-for-it.sh --strict --timeout=$SERVICE_CONNECTION_TIMEOUT $POSTGRES_HOST:$POSTGRES_PORT -- npm run dev

