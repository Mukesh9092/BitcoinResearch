{ get-database } = require '../../lib/database'

db = get-database!

export get-comments-by-user-id = (user-id) ->
  db
    .select!
    .from 'comments'
    .where user_id: user-id
