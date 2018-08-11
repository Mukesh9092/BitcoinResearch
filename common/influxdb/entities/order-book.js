import { FieldType, toNanoDate, IPoint } from 'influx'

import { ensureArray } from '../../array'
import { getInfluxClient } from '../client'
import { orderBookSchema } from '../schemas/order-book'

// Convert all OrderBook messages into this schema.

export async function insert(messages) {
  const client = await getInfluxClient()

  const iPoints = ensureArray(messages).map((message) => {
    return {
      measurement: orderBookSchema.measurement,
      tags: {
        mutationType: message.mutationType,
        mutationSide: message.mutationSide,
      },
      fields: {
        rate: message.rate,
        amount: message.amount,
      },
    }
  })

  await client.writePoints(iPoints)
}
