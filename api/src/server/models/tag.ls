{ get-database } = require '../../lib/database'

db = get-database!

export get-tags = ->
  console.log 'get-tags'

  db
    .select!
    .from 'tags'
