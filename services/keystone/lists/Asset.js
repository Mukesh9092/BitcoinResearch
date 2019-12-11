const { Relationship, Text } = require('@keystonejs/fields')

module.exports = {
  fields: {
    name: {
      type: Text,
      label: 'name',
      schemaDoc: 'Name',
      isUnique: true,
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
