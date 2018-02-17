import * as faker from 'faker';
import { genRandomString, sha512 } from '../common/crypto';
import { promisify } from 'util';

import User from '../common/database/entities/User';
import client from '../common/database/client';

const start = async () => {
  try {

    const connection = await client();
    const userRepository = connection.getRepository('User');

    console.log(`Removing Documents.`);
    await userRepository.remove(await userRepository.find());

    console.log(`Creating Documents.`);

    let user = new User();
    user.email = 'admin@test.com';
    user.passwordSeed = genRandomString(64);
    user.passwordHash = sha512('test', user.passwordSeed).passwordHash;
    user.disabled = false;
    user.frozen = false;
    user.delisted = false;

    await userRepository.save(user);

    for (let i = 1, l = 20; i <= l; i++) {
      const email = faker.internet.email();
      const passwordSeed = genRandomString(64);
      const { passwordHash } = sha512('test', passwordSeed);

      user = new User();
      user.email = `dummy${i}@test.com`;
      user.passwordSeed = genRandomString(64);
      user.passwordHash = sha512('test', user.passwordSeed).passwordHash;
      user.disabled = false;
      user.frozen = false;
      user.delisted = false;

      await userRepository.save(user);
    }

    console.log(`Done.`);

    process.exit(0);
  } catch (error) {
    throw error;
  }
};

start();
