import * as faker from 'faker';
import { generateHash, verifyPassword } from '../common/crypto';
import { promisify } from 'util';

import { getKnexClient } from '../common/database/knex-client';

const start = async () => {
  try {
    const knexClient = getKnexClient();

    console.log();
    console.log(`Removing documents...`);

    await knexClient('user')
      .where({})
      .del();

    console.log(`Documents removed.`);
    console.log();
    console.log(`Creating documents...`);

    let user = await knexClient('user')
      .insert({
        email: 'admin@test.com',
        passwordHash: generateHash('test'),
        disabled: false,
        frozen: false,
        delisted: false,
      })
      .returning('*');

    console.log(`Created: `, user);
    console.log();

    // for (let i = 1, l = 20; i <= l; i++) {
    //   await knexClient.insert({
    //     email: `dummy${i}@test.com`,
    //     passwordHash: generateHash('test'),
    //     disabled: false,
    //     frozen: false,
    //     delisted: false,
    //   });

    //   // console.log(`Created: `, user);
    //   // console.log();
    // }

    console.log(`Documents created.`);
    console.log();

    process.exit(0);
  } catch (error) {
    throw error;
  }
};

start();
