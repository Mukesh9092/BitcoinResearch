rethinkdb = require 'rethinkdb'

{ get-database } = require '../../lib/database'

{
  gen-random-string
  sha512
} = require '../../lib/authentication'

export get-users = ->
  console.log "get-users"

  db <- get-database!
    .then

  cursor <- rethinkdb
    .table 'users'
    .run db
    .then

  cursor.toArray

export get-user-by-id = (id) ->
  console.log "get-user-by-id", id

  db <- get-database!
    .then

  cursor <- rethinkdb
    .table 'users'
    .get id
    .run db
    .then

  [result] <- cursor.toArray
    .then

  result

export get-user-by-email = (email) ->
  console.log "get-user-by-email", email

  get-database!
    .then (db) ->
      rethinkdb
        .table 'users'
        .filter email: email
        .run db
        .then (cursor) -> cursor.to-array!
        .then ([result]) ->
          console.log "get-user-by-email result", result

          result

export get-user-by-email-password = (email, password) ->
  console.log "get-user-by-email-password", email, password

  get-user-by-email email
    .then (user) ->
      console.log "get-user-by-email-password user", user

      { password-hash } = sha512 password, user.password_seed

      console.log 'password-hash', password-hash
      console.log 'user.password_hash', user.password_hash

      if user.password_hash is password-hash
        user
      else
        throw new Error 'Incorrect password'

export create-user-with-email-password = (email, password) ->
  console.log "create-user-with-email-password", email, password

  db <- get-database!
    .then

  password-seed = gen-random-string 64
  { password-hash } = sha512 password, password-seed

  cursor <- rethinkdb
    .table 'users'
    .insert do
      email: email
      password_seed: password-seed
      password_hash: password-hash
    .run db
    .then

  [result] <- cursor.toArray
    .then

  result

export get-or-create-user-by-email-password = (email, password) ->
  console.log "get-or-create-user-by-email-password", email, password

  get-user-by-email-password email, password
    .then (user) ->
      user or create-user-with-email-password email, password

export get-user-by-google-id = (google-id) ->
export get-user-by-google-profile = (profile, token, secret) ->
export create-user-with-google-profile = (profile, token, secret) ->
export get-or-create-user-by-google-profile = (profile, token, secret) ->
