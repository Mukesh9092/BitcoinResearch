#!/usr/bin/env bash

exec postgres \
  -h ${POSTGRES_HOST} \
  -p ${POSTGRES_PORT}
