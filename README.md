# Crypto Dashboard

This application is a dashboard for cryptocurrency markets. Add some markets to your dashboard and view them in full-screen.

## Exchanges:
- [Binance](https://binance.com)

## Dependencies
- [MiniKube](https://github.com/kubernetes/minikube)
- [Kubeless](https://kubeless.io)
- [Docker](https://docker.com)
- [Docker Compose](https://docs.docker.com/compose)

## Install

### PostgreSQL
```bash
helm del --purge \
  postgresql \
  prisma;
  
helm install \
  --debug \
  --dry-run \
  --name postgresql \
  --set postgresqlDatabase=prisma \
  --set global.postgresql.postgresqlPassword=kittensinglobals \
  --set postgresqlPassword=kittensinmittens \
  stable/postgresql;
  
helm install \
  --name prisma \
  --set database.host=postgresql-postgresql.default.svc.cluster.local \
  --set database.port=5432 \
  --set database.user=postgres \
  --set database.password=kittensinmittens \
  stable/prisma;
```

## Usage

    In one terminal:
    $ ./bin/start-kubernetes
    
    In a second terminal:
    $ docker-compose up

# Links
- Services
  - [PostgreSQL Admin](http://pgadmin.localtest.me) (Database GUI)
  - [Prisma GraphQL](http://prisma.localtest.me) (GraphQL API to PostgreSQL)
  - [Tensorflow](http://tensorflow.localtest.me) (Machine Learning Bench)
- Exposed API
  - [Traefik](http://localhost:8080) (Proxy)
  - [API GraphQL](http://api.localtest.me) (Public HTTP API)
  - [Dashboard](http://web.localtest.me) (Public WebApp)

## Future goals
- Live charts through GraphQL Subscriptions.
- Support many indicators on the charts.
- Algorithms for buying and selling.
- Backtests using the Algorithms.
- Algorithms using Machine Learning.
