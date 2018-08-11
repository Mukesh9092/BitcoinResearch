import { FieldType } from 'influx'

export const ohlcSchema = {
  measurement: 'ohlc',
  tags: ['baseKey', 'quoteKey', 'period'],
  fields: {
    open: FieldType.FLOAT,
    high: FieldType.FLOAT,
    low: FieldType.FLOAT,
    close: FieldType.FLOAT,
    volume: FieldType.FLOAT,
  },
}
