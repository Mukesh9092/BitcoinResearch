{
  gen-random-string
  sha512
} = require '../../lib/authentication'
{ get-database } = require '../../lib/database'

db = get-database!

first = ([x]) -> x

export get-users = ->
  console.log 'get-users'

  db
    .select!
    .from 'users'

export get-user-by-id = (id) ->
  console.log 'get-user-by-id', id

  db
    .select!
    .from 'users'
    .where id: id
    .then first

export get-user-by-email = (email) ->
  console.log 'get-user-by-email', email

  db
    .select!
    .from 'users'
    .where email: email
    .then first

export get-user-by-email-password = (email, password) ->
  console.log 'get-user-by-email-password', email, password

  get-user-by-email email
    .then (user) ->
      { password-hash } = sha512 password, user.password_seed

      if user.password_hash is password-hash
        user
      else
        throw new Error 'Incorrect password'

export create-user-with-email-password = (email, password) ->
  console.log 'create-user-with-email-password', email, password

  password-seed = gen-random-string 64
  { password-hash } = sha512 password, password-seed

  db
    .insert do
      email: email
      password_seed: password-seed
      password_hash: password-hash
    .into 'users'

export get-or-create-user-by-email-password = (email, password) ->
  console.log 'get-or-create-user-by-email-password', email, password

  get-user-by-email-password email, password
    .then (user) ->
      user or create-user-with-email-password email, password

export get-user-by-google-id = (google-id) ->
export get-user-by-google-profile = (profile, token, secret) ->
export create-user-with-google-profile = (profile, token, secret) ->
export get-or-create-user-by-google-profile = (profile, token, secret) ->
