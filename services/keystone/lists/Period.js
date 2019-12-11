const { Integer, Relationship, Text } = require('@keystonejs/fields')

module.exports = {
  fields: {
    name: {
      type: Text,
      label: 'name',
      schemaDoc: 'Name',
      isUnique: true,
      isRequired: true,
    },
    inMilliseconds: {
      type: Integer,
      label: 'in-milliseconds',
      schemaDoc: 'In Milliseconds',
      isUnique: false,
      isRequired: true,
    },
    trader: {
      type: Relationship,
      ref: 'Trader',
      label: 'trader',
      schemaDoc: 'Trader',
      isUnique: false,
      isRequired: true,
    },
  },
}
