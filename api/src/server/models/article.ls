{ get-database } = require '../../lib/database'

db = get-database!

first = ([x]) -> x

export get-articles = ->
  db
    .select!
    .from 'articles'

export get-articles-by-user-id = (user-id) ->
  db
    .select!
    .from 'articles'
    .where user_id: user-id

export get-articles-by-username = (username) ->
  db
    .select!
    .from 'articles'
    .where username: username

export get-articles-by-email = (email) ->
  db
    .select!
    .from 'articles'
    .where email: email

export get-articles-by-tag = (tag-id) ->
  db
    .select!
    .from 'articles_tags'
    .where tag_id: tag-id
    .join 'articles', 'articles.id', 'articles_tags.article_id'

export get-article-by-id = (id) ->
  db
    .select!
    .where id: id
    .then first

export get-article-by-slug = (slug) ->
  db
    .select!
    .where slug: slug
    .then first
