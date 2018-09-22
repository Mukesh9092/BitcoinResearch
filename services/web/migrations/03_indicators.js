exports.up = async (knex) => {
  await knex.schema.createTable('indicator_point', (table) => {
    table.string('trader')
    table.string('name')
    table.string('base')
    table.string('quote')
    table.string('period')
    table.timestamp('timestamp')
    table.string('value')

    table.primary(['trader', 'name', 'base', 'quote', 'period', 'timestamp'])
  })

  await knex.schema.createTable('indicator_line', (table) => {
    table.string('trader')
    table.string('name')
    table.string('base')
    table.string('quote')
    table.string('period')
    table.timestamp('timestamp')
    table.string('value')

    table.primary(['trader', 'name', 'base', 'quote', 'period', 'timestamp'])
  })

  await knex.schema.createTable('indicator_band', (table) => {
    table.string('trader')
    table.string('name')
    table.string('base')
    table.string('quote')
    table.string('period')
    table.timestamp('timestamp')
    table.string('upper')
    table.string('middle')
    table.string('lower')

    table.primary(['trader', 'name', 'base', 'quote', 'period', 'timestamp'])
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable('indicator_point')
  await knex.schema.dropTable('indicator_line')
  await knex.schema.dropTable('indicator_band')
}
