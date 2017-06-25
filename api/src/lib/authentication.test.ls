{ format-error } = require './error'
{ expect } = require 'chai'

{
  gen-random-string
  sha512
} = require './authentication'


we = it

describe 'lib/authentication', !->
  describe 'gen-random-string', !->
    describe 'When passed length parameter', !->
      we 'Should return a string of that length', ->
        length = 64
        random-string = gen-random-string length

        expect random-string
          .to.have.length-of length

  describe 'sha512', !->
    describe 'When passed a password and a salt', !->
      we 'Should return an object with the salt and a 128 character long string', ->
        password = 'keyboardcat'
        generated-salt = gen-random-string 64
        {
          salt
          password-hash
        } = sha512 password, generated-salt

        expect salt
          .to.equal salt

        expect password-hash
          .to.have.length-of 128
