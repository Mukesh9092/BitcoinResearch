const { Text } = require('@keystonejs/fields')

module.exports = {
  fields: {
    name: {
      type: Text,
      label: 'name',
      schemaDoc: 'Name',
      isUnique: true,
      isRequired: true,
    },
  },
}
