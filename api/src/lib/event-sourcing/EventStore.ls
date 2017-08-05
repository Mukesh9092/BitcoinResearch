{ EventEmitter } = require 'events'

export class EventStore extends EventEmitter
  (options) ->
    super options
