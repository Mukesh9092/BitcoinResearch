export up = (knex) ->
  Promise.all [
    knex.schema.create-table 'users', (table) ->
      table
        .increments 'id'
        .primary!

      table
        .string 'email'

      table
        .string 'username'

      table
        .string 'password_seed', 64

      table
        .string 'password_hash', 128

    knex.schema.create-table 'tags', (table) ->
      table
        .increments 'id'
        .primary!

      table
        .string 'label'

    knex.schema.create-table 'articles', (table) ->
      table
        .increments 'id'
        .primary!

      table
        .string 'title'

      table
        .string 'slug'

      table
        .text 'body'

      table
        .timestamp 'created'
        .not-nullable!
        .default-to knex.raw 'now()'

      table
        .timestamp 'updated'
        .not-nullable!
        .default-to knex.raw 'now()'

      table
        .integer 'user_id'
        .unsigned!
        .references 'users.id'
        .on-delete 'CASCADE'

    knex.schema.create-table 'articles_tags', (table) ->
      table
        .increments 'id' # no primary

      table
        .integer 'article_id'
        .unsigned!
        .references('articles.id')
        .on-delete 'CASCADE'

      table
        .integer 'tag_id'
        .unsigned!
        .references('tags.id')
        .on-delete 'CASCADE'

    knex.schema.create-table 'comments', (table) ->
      table
        .increments 'id' .primary!

      table
        .text 'body'

      table
        .timestamp 'created'
        .not-nullable!
        .default-to knex.raw 'now()'

      table
        .timestamp 'updated'
        .not-nullable!
        .default-to knex.raw 'now()'

      table
        .integer 'user_id'
        .unsigned!
        .references 'users.id'
        .onDelete 'CASCADE'

      table
        .integer 'article_id'
        .unsigned!
        .references 'articles.id'
        .onDelete 'CASCADE'
  ]

export down = (knex) ->
  Promise.all [
    knex.schema.drop-table 'comments'

    knex.schema.drop-table 'articles_tags'

    knex.schema.drop-table 'articles'

    knex.schema.drop-table 'tags'

    knex.schema.drop-table 'users'
  ]
