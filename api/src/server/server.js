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

const { NODE_ENV } = process.env

if (NODE_ENV === 'develop') {
  log.setLevel('debug')
}

const HOSTNAME = process.env.IP || '0.0.0.0'
const PORT = process.env.PORT || 3000
// const CWD = path.resolve(__dirname)
// const ADDRESS = `http://${HOSTNAME}:${PORT}`

const app = new Koa()
app.keys = ['keyboardcat']

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
  .use(koaBodyparser())
  .use(koaSession())
  .use(koaPassport.initialize())
  .use(koaPassport.session())
  .use(router.routes())
  .use(router.allowedMethods())

async function start() {
  try {
    /*
    log.info('Running migrations...')

    await db.migrate.latest()

    log.info('Migrations complete.')

    log.info('Running seed...')

    await db.seed.run()

    log.info('Seed complete.')

    log.info('Starting HTTP Server...')
    */

    await app.listen(PORT, HOSTNAME)

    log.info(`HTTP Server listening at http://${HOSTNAME}:${PORT}`)
  } catch (error) {
    log.error(error)
    process.exit()
  }
}

start()
