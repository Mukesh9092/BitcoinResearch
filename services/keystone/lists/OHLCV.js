const { Relationship, Float, Integer } = require('@keystonejs/fields')

module.exports = {
  fields: {
    trader: {
      type: Relationship,
      ref: 'Trader',
      label: 'trader',
      schemaDoc: 'Trader',
      isUnique: false,
      isRequired: true,
    },
    asset: {
      type: Relationship,
      ref: 'Asset',
      label: 'asset',
      schemaDoc: 'Asset',
      isUnique: false,
      isRequired: true,
    },
    period: {
      type: Relationship,
      ref: 'Period',
      label: 'period',
      schemaDoc: 'Period',
      isUnique: false,
      isRequired: true,
    },
    period_start: {
      type: Integer,
      label: 'period-start',
      schemaDoc: 'Period Start',
      isUnique: false,
      isRequired: true,
    },
    period_end: {
      type: Integer,
      label: 'period-end',
      schemaDoc: 'Period End',
      isUnique: false,
      isRequired: true,
    },
    open: {
      type: Float,
      label: 'open',
      schemaDoc: 'Open',
      isUnique: false,
      isRequired: true,
    },
    high: {
      type: Float,
      label: 'high',
      schemaDoc: 'High',
      isUnique: false,
      isRequired: true,
    },
    low: {
      type: Float,
      label: 'low',
      schemaDoc: 'Low',
      isUnique: false,
      isRequired: true,
    },
    close: {
      type: Float,
      label: 'close',
      schemaDoc: 'Close',
      isUnique: false,
      isRequired: true,
    },
    volume: {
      type: Float,
      label: 'volume',
      schemaDoc: 'Volume',
      isUnique: false,
      isRequired: true,
    },
  },
}
