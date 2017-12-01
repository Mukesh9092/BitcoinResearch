#!/usr/bin/env bash

source ./lib/service-env-local.sh
export SERVICE_SECRET=keyboardcat

npm install

exec npm run dev
