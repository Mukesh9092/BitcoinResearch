const zlib = require('zlib')

const Koa = require('koa')
const koaBodyparser = require('koa-bodyparser')
const koaCompress = require('koa-compress')
const koaConvert = require('koa-convert')
const koaErrorHandler = require('koa-errorhandler')
const koaHelmet = require('koa-helmet')
const koaLogger = require('koa-logger')
const koaPing = require('koa-ping')
const koaRedis = require('koa-redis')
const koaSession = require('koa-generic-session')
const log = require('loglevel')

const {
  NODE_ENV,
  REDIS_HOST,
  REDIS_PORT,
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

app
  .use(koaPing())
  .use(koaLogger())
  .use(koaErrorHandler())
  .use(koaBodyparser())
  .use(koaSession({
    rolling: true,

    store: koaRedis({
      host: REDIS_HOST,
      port: REDIS_PORT,
    }),
  }))
  .use(koaCompress({
    filter: contentType => /text/i.test(contentType),
    threshold: 2048,
    flush: zlib.Z_SYNC_FLUSH,
  }))
  .use(koaHelmet())

module.exports = app
