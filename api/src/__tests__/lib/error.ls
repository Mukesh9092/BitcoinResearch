assert = require 'assert'

{ format-error } = require '../../lib/error'

describe 'lib/error', !->
  describe 'format-error', !->
    describe 'When passed an error object', !->
      describe 'When the error object contains a `stack` key', !->
        test 'Should return the stack', !->
          error = new Error 'derp'
          error.stack = 'herp'

          expect format-error error
            .to-equal 'herp'

      describe 'When the error object contains no `stack` key', !->
        test 'Should return the error', ->
          error = 'derp'

          expect format-error error
            .to-equal 'derp'
