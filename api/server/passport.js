const LocalStrategy = require('passport-local')
const connectRedis = require('connect-redis')
const expressSession = require('express-session')
const log = require('loglevel')
const passport = require('passport')
const { OAuthStrategy: GoogleStrategy } = require('passport-google-oauth')

const user = require('../lib/models/user')

const {
  REDIS_HOST,
  REDIS_PORT,
} = process.env

const RedisStore = connectRedis(expressSession)

const redisStore = new RedisStore({
  host: REDIS_HOST,
  port: REDIS_PORT,
})

const localStrategyImplementation = (email, password, cb) => {
  user.getUserByEmailPassword(email, password)
    .then(user => cb(null, user))
    .catch(cb)
}

const localStrategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: true,
}, localStrategyImplementation)

function setupPassport(app) {
  passport.serializeUser((user, cb) => {
    console.log('passport.serializeUser', user)

    cb(null, user.id)
  })

  passport.deserializeUser((id, cb) => {
    console.log('passport.deserializeUser', id)

    user.getUserById(id)
      .then(result => cb(null, result))
      .catch(cb)
  })

  passport.use(localStrategy)

  app
    .use(expressSession({
      secret: app.keys[0],
      cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 24,
      },
      saveUninitialized: true,
      resave: true,
      store: redisStore,
    }))
    .use(passport.initialize())
    .use(passport.session())

  app.post('/api/authentication/local', passport.authenticate('local'), (req, res) => {
    res.send(user.toJSON(req.user))
  })
}

module.exports = {
  setupPassport,
}
