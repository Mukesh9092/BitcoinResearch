const faker = require("faker");
const { genRandomString, sha512 } = require("../lib/crypto");

const store = require('../lib/database/store')

const start = async () => {
  const email = "admin@test.com";
  const username = "admin";
  const passwordSeed = genRandomString(64);
  const { passwordHash } = sha512("test", passwordSeed);

  const documents = [
    {
      email: email,
      username: username,
      password_seed: passwordSeed,
      password_hash: passwordHash,
      disabled: false,
      frozen: false,
      delisted: false,
    },
  ];

  for (let i = 2, l = 20; i < l; i++) {
    const email = faker.internet.email();
    const username = faker.internet.userName();
    const passwordSeed = genRandomString(64);
    const { passwordHash } = sha512("test", passwordSeed);

    documents.push({
      email: email,
      username: username,
      password_seed: passwordSeed,
      password_hash: passwordHash,
      disabled: false,
      frozen: false,
      delisted: false,
    });
  }

  await store.createMany('user', documents)

  process.exit()
}

start()
