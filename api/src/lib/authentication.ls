{ create-hmac, random-bytes } = require 'crypto'

export gen-random-string = (length) ->
  random-bytes Math.ceil length / 2
    .to-string 'hex'
    .slice 0, length

export sha512 = (password, salt) ->
  salt: salt
  password-hash: create-hmac 'sha512', salt
    .update password
    .digest 'hex'
