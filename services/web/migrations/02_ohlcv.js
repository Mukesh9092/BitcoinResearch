exports.up = (knex) => {
  return knex.schema.createTable('ohlcv', (table) => {
    table.string('trader')
    table.string('base')
    table.string('quote')
    table.string('period')
    table.timestamp('timestamp')
    table.string('open')
    table.string('high')
    table.string('low')
    table.string('close')
    table.string('volume')

    table.primary(['trader', 'base', 'quote', 'period', 'timestamp'])
  })
}

exports.down = (knex) => knex.schema.dropTable('ohlcv')
