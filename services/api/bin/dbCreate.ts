import * as faker from 'faker';
import { generateHash, verifyPassword } from '../common/crypto';
import { promisify } from 'util';

import { getKnexClient } from '../common/database/knex-client';

const start = async () => {
  try {
    const knexClient = getKnexClient();

    console.log(`Dropping tables.`);

    await knexClient.schema.dropTableIfExists('currency_pair');
    await knexClient.schema.dropTableIfExists('user');

    console.log(`Creating tables.`);

    await knexClient.schema.createTable('user', table => {
      table.increments();
      table.string('email');
      table.string('passwordHash');
      table.boolean('disabled');
      table.boolean('frozen');
      table.boolean('delisted');
      table.timestamps();
    });

    console.log(`Inserting rows.`);

    let user = await knexClient('user')
      .insert({
        email: 'admin@test.com',
        passwordHash: await generateHash('test'),
        disabled: false,
        frozen: false,
        delisted: false,
      })
      .returning('*');

    // console.log(`Created: `, user);

    for (let i = 1, l = 20; i <= l; i++) {
      user = await knexClient('user')
        .insert({
          email: `dummy${i}@test.com`,
          passwordHash: await generateHash('test'),
          disabled: false,
          frozen: false,
          delisted: false,
        })
        .returning('*');

      // console.log(`Created: `, user);
    }

    console.log(`Done.`);

    process.exit(0);
  } catch (error) {
    throw error;
  }
};

start();
