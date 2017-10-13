#!/usr/bin/env bash

source ./lib/service-env-local.sh

export SERVICE_HOST=0.0.0.0
export SERVICE_PORT=8000
export SERVICE_SECRET=keyboardcat

npm install

exec npm run dev
