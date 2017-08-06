LocalStrategy                     = require 'passport-local'
log                               = require 'loglevel'
passport                          = require 'passport'
{ OAuthStrategy: GoogleStrategy } = require 'passport-google-oauth'

user = require '../lib/models/user'

{
  GOOGLE_API_CLIENT_ID
  GOOGLE_API_CLIENT_SECRET
} = process.env

callback-result = (cb) -> (result) -> cb null, result

passport.serialize-user (user, cb) ->
  console.log "passport.serialize-user", user

  cb null, user.id

passport.deserialize-user (id, cb) ->
  console.log "passport.deserialize-user", id

  user.get-user-by-id id
    .then callback-result cb
    .catch cb

local-strategy-options =
  username-field: 'email'
  password-field: 'password'
  session: true

local-strategy-callback = (email, password, cb) ->
  user.get-or-create-user-by-email-password email, password
    .then callback-result cb
    .catch cb

passport.use new LocalStrategy local-strategy-options, local-strategy-callback

google-strategy-options =
  consumer-key: GOOGLE_API_CLIENT_ID
  consumer-secret: GOOGLE_API_CLIENT_SECRET
  callback-URL: '/api/authentication/google/callback'
  session: true

google-strategy-callback = (token, secret, profile, cb) ->
  user.ger-or-create-user-by-google-profile profile, token, secret
    .then callback-result cb
    .catch cb

passport.use new GoogleStrategy google-strategy-options, google-strategy-callback

export passport
