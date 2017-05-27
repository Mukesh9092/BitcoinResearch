import zlib from 'zlib'

import Koa from 'koa'
import koaBodyparser from 'koa-bodyparser'
import koaCompress from 'koa-compress'
import koaConvert from 'koa-convert'
import koaErrorHandler from 'koa-errorhandler'
import koaHelmet from 'koa-helmet'
import koaLogger from 'koa-logger'
import koaPassport from 'koa-passport'
import koaPing from 'koa-ping'
import koaRedis from 'koa-redis'
import koaResponseTime from 'koa-response-time'
import koaRouter from 'koa-router'
import koaSession from 'koa-generic-session'
import log from 'loglevel'
import { graphqlKoa } from 'graphql-server-koa';
import { makeExecutableSchema } from 'graphql-tools'

import * as graphqlResolvers from './graphql/resolvers'
import graphqlSchema from './graphql/schema'

import './authentication'

// Import this first.
import getDatabase from './database'

const {
  NODE_ENV,
  REDIS_HOST,
  REDIS_PORT,
  APP_HOST,
  APP_PORT,
  APP_KEYS,
} = process.env

if (NODE_ENV === 'develop') {
  log.setLevel('debug')
}

const app = new Koa()
app.keys = [APP_KEYS.split(',')]

// Hook to convert old Koa.js middleware
const oldUse = app.use
app.use = x => oldUse.call(app, koaConvert(x))

const db = getDatabase()
const router = koaRouter()

const executableSchema = makeExecutableSchema({
  typeDefs: graphqlSchema,
  resolvers: graphqlResolvers,
})

router.all('/api/graphql', graphqlKoa({ schema: executableSchema }));

app
  .use(koaLogger())
  .use(koaErrorHandler())
  .use(koaBodyparser())
  .use(koaSession({
    rolling: true,

    store: koaRedis({
      host: REDIS_HOST,
      port: REDIS_PORT,
    })
  }))
  .use(router.routes())
  .use(router.allowedMethods())

  .use(koaHelmet())
  .use(koaResponseTime())
  .use(
    koaCompress({
      filter: contentType => /text/i.test(contentType),
      threshold: 2048,
      flush: zlib.Z_SYNC_FLUSH,
    }),
  )
  .use(koaPing())

app.listen(APP_PORT, APP_HOST, (error) => {
  if (error) {
    log.error(error)
    return process.exit()
  }

  log.info(`HTTP Server listening at http://${APP_HOST}:${APP_PORT}`)
})
