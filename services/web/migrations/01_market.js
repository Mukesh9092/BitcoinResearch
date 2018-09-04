exports.up = (knex) => {
  return knex.schema.createTable('market', (table) => {
    table.increments()
    table.string('trader')
    table.string('base')
    table.string('quote')
    table.string('category')
    table.string('type')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('market')
}
