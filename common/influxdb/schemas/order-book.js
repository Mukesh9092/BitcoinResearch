import { FieldType } from 'influx'

export const orderBookSchema = {
  measurement: 'orderBook',
  tags: ['mutationType', 'mutationSide'],
  fields: {
    rate: FieldType.FLOAT,
    amount: FieldType.FLOAT,
  },
}
