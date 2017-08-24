const path = require('path')
const zlib = require('zlib')

const bodyParser = require('body-parser')
const connectRedis = require('connect-redis')
const cookieParser = require('cookie-parser')
const express = require('express')
const expressSession = require('express-session')
const log = require('loglevel')
const { graphqlExpress } = require('graphql-server-express')

const { executableSchema } = require('./graphql')
const { getDatabase } = require('../lib/database')
const { passport } = require('./passport')

const {
  API_EVENT_STORE_DATA_PATH,
  API_HOST,
  API_KEYS,
  API_PORT,
  NODE_ENV,
  REDIS_HOST,
  REDIS_PORT,
} = process.env

const RedisStore = connectRedis(expressSession)

const debugLevel = NODE_ENV === 'develop' ? 'debug' : 'info'

log.setLevel(debugLevel)
console.log(`Log level is: ${debugLevel}`)

const app = express()
app.keys = API_KEYS.split(',')

app
  .use(cookieParser())
  .use(bodyParser.json())

  .use(expressSession({
    secret: API_KEYS[0],
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24,
    },
    saveUninitialized: true,
    resave: true,
    store: new RedisStore({
      host: REDIS_HOST,
      port: REDIS_PORT,
    })
  }))

  .use(passport.initialize())
  .use(passport.session())

app.all('/api/graphql', graphqlExpress({ schema: executableSchema }))

app.post('/api/authentication/local', passport.authenticate('local', { session: true }), (req, res) => {
  log.info('req.sessionID', req.sessionID)
  log.info('req.session', req.session)
  log.info('req.user', req.user)

  // { user } = req
  //
  // delete user.password_seed
  // delete user.password_hash
  //
  // res.send user
})

app.listen(API_PORT, API_HOST, (error) => {
  if (error) {
    log.error(error)
    return
  }

  log.info(`HTTP Server listening at http://${API_HOST}:${API_PORT}`)
})
