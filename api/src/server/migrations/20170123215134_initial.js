exports.up = (knex) => {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.string('email')
      table.string('username')
      table.string('password')
    }),

    knex.schema.createTable('tags', (table) => {
      table.increments('id').primary()
      table.string('label')
    }),

    knex.schema.createTable('articles', (table) => {
      table.increments('id').primary()
      table.string('title')
      table.string('slug')
      table.text('body')
      table.timestamp('created').notNullable().defaultTo(knex.raw('now()'))
      table.timestamp('updated').notNullable().defaultTo(knex.raw('now()'))
      table.integer('userId').unsigned().references('users.id').onDelete('CASCADE')
    }),

    knex.schema.createTable('articles_tags', (table) => {
      table.increments('id')
      table.integer('articleId').unsigned().references('articles.id').onDelete('CASCADE')
      table.integer('tagId').unsigned().references('tags.id').onDelete('CASCADE')
    }),

    knex.schema.createTable('comments', (table) => {
      table.increments('id').primary()
      table.text('body')
      table.timestamp('created').notNullable().defaultTo(knex.raw('now()'))
      table.timestamp('updated').notNullable().defaultTo(knex.raw('now()'))
      table.integer('userId').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('articleId').unsigned().references('articles.id').onDelete('CASCADE')
    }),
  ])
}

exports.down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('users'),
  ])
}
