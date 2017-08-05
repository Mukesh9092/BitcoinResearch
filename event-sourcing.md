# Event Sourcing

I think that when implementing Event Sourcing with Node.js, Streams should be
the paradigm.

## Parts of the System

### Command
A `Command` is a `Function` that returns an `Array` of `Event`'s.

    const myCommand = () => ([
      { event },
      ...
    ])

### Event
An `Event` is a `Function` that returns an `Object` with at least the
properties `type` (`String`) and `payload` (`Object`).

    const myEvent = {
      type: 'type'
      payload: {
        key: 'value,'
      },
    }

### EventStore
The `EventStore` is the persistant storage that keeps all the `Event`'s. The
best place for storing things persistently is a database, so I use a database
collection to store `Event`'s.

### EventProcessor
`Event`'s are handled by the `EventProcessor`. It decides what to do when an
`Event` happens.

`Event`'s coming from `Command`'s and the `EventStore` are both fed into the
`EventProcessor` and cause changes in the `State`. When an `Event` is done
processing, it is sent to the `EventStore` to be stored.

Each `Event` gets a `Transaction`. `Transaction`'s are handled serially to
ensure the consistency of the application state.

### Transaction
In the processing of one `Transaction`, the `EventProcessor` may generate new
`Event`'s, which are all handled as sub-`Transaction` within the current one.
When all sub-`Transaction` have been processed the `EventProcessor` will
continue to handle the next event.

## Network Services

### Write Model

### Read Model

