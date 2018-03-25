import { FieldType, toNanoDate, IPoint } from 'influx';

import { ensureArray } from '../../array';
import { getInfluxClient } from '../client';

const MEASUREMENT_NAME = 'orderBook';

// Convert all OrderBook messages into this schema.

export const orderBookSchema = {
  measurement: MEASUREMENT_NAME,
  tags: ['mutationType', 'mutationSide'],
  fields: {
    rate: FieldType.FLOAT,
    amount: FieldType.FLOAT,
  },
};

export async function insert(messages) {
  const client = await getInfluxClient();

  const iPoints = ensureArray(messages).map(message => {
    return {
      measurement: MEASUREMENT_NAME,
      tags: {
        mutationType: message.mutationType,
        mutationSide: message.mutationSide,
      },
      fields: {
        rate: message.rate,
        amount: message.amount,
      },
    };
  });

  await client.writePoints(iPoints);
}
