zlib = require 'zlib'

Koa = require 'koa'
koa-bodyparser = require 'koa-bodyparser'
koa-compress = require 'koa-compress'
koa-convert = require 'koa-convert'
koa-error-handler = require 'koa-errorhandler'
koa-generic-session = require 'koa-generic-session'
koa-helmet = require 'koa-helmet'
koa-logger = require 'koa-logger'
koa-ping = require 'koa-ping'
koa-redis = require 'koa-redis'
koa-response-time = require 'koa-response-time'
koa-router = require 'koa-router'
log = require 'loglevel'
{ graphql-koa } = require 'graphql-server-koa'

{ passport } = require './passport'
{ executableSchema } = require './graphql'
{ getDatabase } = require '../lib/database'

{
  NODE_ENV
  REDIS_HOST
  REDIS_PORT
  APP_HOST
  APP_PORT
  APP_KEYS
} = process.env

debug-level = NODE_ENV is 'develop' and 'debug' or 'info'

log.set-level debug-level
console.log "Log level is: #{debug-level}"

app = new Koa!
app.keys = APP_KEYS.split ','

#old-koa-use = app.use
#app.use (x) -> old-koa-use.call app, koa-convert x

db = get-database!

graphql-router = koa-router!
graphql-router.all '/',
  graphql-koa schema: executable-schema

authentication-router = koa-router!

authentication-router.post '/local',
  passport.authenticate 'local'
  (context, next) ->
    { user } = context.req

    delete user.password-seed
    delete user.password-hash

    context.body = user

authentication-router.get '/google',
  passport.authenticate 'google', scope: <[ profile email ]>

authentication-router.get '/google/callback',
  passport.authenticate 'google',
    success-return-to-or-redirect: '/login'
    failure-redirect: '/login'

api-router = koa-router!

api-router.use '/api/graphql',
  graphql-router.routes!,
  graphql-router.allowedMethods!

api-router.use '/api/authentication',
  authentication-router.routes!,
  authentication-router.allowedMethods!

app
  # .use koa-ping!
  .use koa-bodyparser!
  # .use koa-helmet!
  # .use koa-response-time!
  # .use koa-compress do
  #   filter: (content-type) -> /text/i.test content-type
  #   threshold: 2048
  #   flush: zlib.Z_SYNC_FLUSH
  .use koa-generic-session do
    store: koa-redis do
      host: REDIS_HOST
      port: REDIS_PORT
  .use passport.initialize!
  .use passport.session!
  .use api-router.routes!
  .use api-router.allowed-methods!
  # .use koa-logger!
  # .use koa-error-handler!

app.listen APP_PORT, APP_HOST, (error) ->
  return log.error error if error

  log.info "HTTP Server listening at http://#{APP_HOST}:#{APP_PORT}"
