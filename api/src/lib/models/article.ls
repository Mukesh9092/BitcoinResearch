rethinkdb = require 'rethinkdb'

{ get-database } = require '../../lib/database'

export get-articles = ->
  db <- get-database!
    .then

  cursor <- rethinkdb
    .table 'articles'
    .run db
    .then

  cursor.toArray

export get-articles-by-user-id = (user_id) ->
  db <- get-database!
    .then

  cursor <- rethinkdb
    .table 'articles'
    .filter rethinkdb.row 'user_id' .eq user_id
    .run db
    .then

  cursor.toArray

export get-articles-by-username = (username) ->
  db <- get-database!
    .then

  cursor <- rethinkdb
    .table 'articles'
    .filter rethinkdb.row 'username' .eq username
    .run db
    .then

  cursor.toarray

export get-articles-by-email = (email) ->
  db <- get-database!
    .then

  cursor <- rethinkdb
    .table 'articles'
    .filter rethinkdb.row 'email' .eq email
    .run db
    .then

  cursor.toarray

export get-articles-by-tag = (tag-id) ->
  []

  # db
  #   .select!
  #   .from 'articles_tags'
  #   .where tag_id: tag-id
  #   .join 'articles', 'articles.id', 'articles_tags.article_id'

export get-article-by-id = (id) ->
  db <- get-database!
    .then

  cursor <- rethinkdb
    .table 'articles'
    .get id
    .run db
    .then

  [result] <- cursor.toArray
    .then

  result

export get-article-by-slug = (slug) ->
  db <- get-database!
    .then

  cursor <- rethinkdb
    .table 'articles'
    .filter rethinkdb.row 'slug' .eq slug
    .run db
    .then

  [result] <- cursor.toArray
    .then

  result
