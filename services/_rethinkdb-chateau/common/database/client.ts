import 'reflect-metadata';

import { createConnection } from 'typeorm';

import CurrencyPair from './entities/CurrencyPair';
import User from './entities/User';

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env;

let client: any;

export default async () => {
  try {
    // console.log('client');

    if (client) {
      // console.log('client cached');

      return client;
    }

    // console.log('client not cached');

    client = await createConnection({
      type: 'postgres',
      host: String(POSTGRES_HOST),
      port: Number(POSTGRES_PORT),
      username: String(POSTGRES_USER),
      password: String(POSTGRES_PASSWORD),
      database: String(POSTGRES_DB),
      entities: [CurrencyPair, User],
      synchronize: true,
      logging: false,
    });

    // console.log('client new', client);

    return client;
  } catch (error) {
    throw error;
  }
};
