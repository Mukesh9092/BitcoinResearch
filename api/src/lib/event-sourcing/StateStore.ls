{ EventEmitter } = require 'events'

{ get, set } = require 'lodash'

export class StateStore extends EventEmitter
  (options) ->
    super options

    @state = {}

  get: (k) ->
    get @state, k

  set: (k, v) ->
    set @state, k, v

    @emit k, v
