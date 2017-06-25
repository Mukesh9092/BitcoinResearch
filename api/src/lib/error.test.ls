assert = require 'assert'
{ format-error } = require './error'

we = it

describe 'lib/error', !->
  describe 'format-error', !->
    describe 'When passed an error object', !->
      describe 'When the error object contains a `stack` key', !->
        we 'Should return the stack', ->
          error = new Error 'derp'
          error.stack = 'herp'
          assert.equal 'herp', format-error error

      describe 'When the error object contains no `stack` key', !->
        we 'Should return the error', ->
          error = 'derp'
          assert.equal 'derp', format-error error
