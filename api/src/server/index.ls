path = require 'path'
zlib = require 'zlib'

body-parser         = require 'body-parser'
connect-redis       = require 'connect-redis'
cookie-parser       = require 'cookie-parser'
express             = require 'express'
express-session     = require 'express-session'
log                 = require 'loglevel'
{ graphql-express } = require 'graphql-server-express'

#{ EventStore }       = require '../lib/event-sourcing/EventStore'
{ executableSchema } = require './graphql'
{ getDatabase }      = require '../lib/database'
{ passport }         = require './passport'

{
  API_EVENT_STORE_DATA_PATH
  API_HOST
  API_KEYS
  API_PORT
  NODE_ENV
  REDIS_HOST
  REDIS_PORT
} = process.env

RedisStore = connect-redis(express-session)

debug-level = NODE_ENV is 'develop' and 'debug' or 'info'

log.set-level debug-level
console.log "Log level is: #{debug-level}"

app = express!
app.keys = API_KEYS.split ','

app
  .use cookie-parser!
  .use body-parser.json!

  .use express-session do
    secret: API_KEYS.0
    cookie:
      path: '/'
      http-only: true
      secure: false
      maxAge: 60 * 60 * 24
    # rolling: true
    save-uninitialized: true
    resave: true
    store: new RedisStore do
      host: REDIS_HOST
      port: REDIS_PORT

  #.use passport.initialize!
  #.use passport.session!

app.all '/api/graphql', graphql-express schema: executable-schema

# app.post '/api/authentication/local', passport.authenticate 'local'

app.post '/api/authentication/local', /*(passport.authenticate 'local', session: true),*/ (req, res, next) ->
  log.info "req.sessionID", req.sessionID
  log.info "req.session", req.session
  log.info "req.user", req.user

  # { user } = req
  #
  # delete user.password_seed
  # delete user.password_hash
  #
  # res.send user

/*
app.get '/api/authentication/google',
  passport.authenticate 'google',
    scope: <[ profile email ]>

app.get '/api/authentication/google/callback',
  passport.authenticate 'google',
    success-return-to-or-redirect: '/login'
    failure-redirect: '/login'
*/

error <- app.listen API_PORT, API_HOST

return log.error error if error

log.info "HTTP Server listening at http://#{API_HOST}:#{API_PORT}"
