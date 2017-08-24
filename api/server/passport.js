const LocalStrategy = require('passport-local')
const log = require('loglevel')
const passport = require('passport')
const { OAuthStrategy: GoogleStrategy } = require('passport-google-oauth')

const user = require('../lib/models/user')

const {
  GOOGLE_API_CLIENT_ID,
  GOOGLE_API_CLIENT_SECRET,
} = process.env

const callbackResult = (cb) => (result) => cb(null, result)

passport.serializeUser((user, cb) => {
  console.log('passport.serializeUser', user)

  cb(null, user.id)
})

passport.deserializeUser((id, cb) => {
  console.log('passport.deserializeUser', id)

  user.getUserById(id)
    .then(callbackResult(cb))
    .catch(cb)
})

const localStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
  session: true,
}

const localStrategyCallback = (email, password, cb) => {
  user.getOrCreateUserByEmailPassword(email, password)
    .then(callbackResult(cb))
    .catch(cb)
}

passport.use(new LocalStrategy(localStrategyOptions, localStrategyCallback))

module.exports = {
  passport,
}
