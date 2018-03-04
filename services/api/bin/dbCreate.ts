import * as faker from 'faker';
import { genRandomString, sha512 } from '../common/crypto';
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

    let passwordSeed = genRandomString(64);
    let passwordHash = sha512('test', passwordSeed).passwordHash;

    let user = await knexClient
      .insert({
        email: 'admin@test.com',
        passwordSeed,
        passwordHash,
        disabled: false,
        frozen: false,
        delisted: false,
      })
      .returning('*')
      .toString();

    console.log(`Created: `, user);
    console.log();

    // for (let i = 1, l = 20; i <= l; i++) {
    //   passwordSeed = genRandomString(64);
    //   passwordHash = sha512('test', passwordSeed).passwordHash;

    //   user = await knexClient
    //     .insert({
    //       email: `dummy${i}@test.com`,
    //       passwordSeed,
    //       passwordHash,
    //       disabled: false,
    //       frozen: false,
    //       delisted: false,
    //     })
    //     .returning('*');

    //   console.log(`Created: `, user);
    //   console.log();
    // }

    console.log(`Documents created.`);
    console.log();

    process.exit(0);
  } catch (error) {
    throw error;
  }
};

start();
