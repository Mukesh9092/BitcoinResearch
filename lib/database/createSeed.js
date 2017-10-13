const faker = require("faker");

const createTableRecord = require("./createTableRecord");
const getDatabase = require("./getDatabase");
const { genRandomString, sha512 } = require("../crypto");

const createArticles = db => {
  console.log("Creating articles.");

  const promises = [];

  for (let i = 0, l = 20; i < l; i++) {
    const title = faker.lorem.words();
    const slug = faker.helpers.slugify(title);

    promises.push(
      createTableRecord(db, "articles", {
        id: faker.random.uuid(),
        title: title,
        slug: slug,
        body: faker.lorem.paragraphs(10),
        created: new Date(),
        updated: new Date(),
        userId: Math.floor(Math.random() * 20)
      })
    );
  }

  return Promise.all(promises);
};

const createUsers = db => {
  console.log("Creating users.");

  const promises = [];

  const email = "admin@test.com";
  const username = "admin";
  const passwordSeed = genRandomString(64);
  const { passwordHash } = sha512("test", passwordSeed);

  promises.push(
    createTableRecord(db, "users", {
      id: faker.random.uuid(),
      email: email,
      username: username,
      password_seed: passwordSeed,
      password_hash: passwordHash,
      disabled: 0,
      frozen: 0,
      delisted: 0
    })
  );

  for (let i = 2, l = 20; i < l; i++) {
    const email = faker.internet.email();
    const username = faker.internet.userName();
    const passwordSeed = genRandomString(64);
    const { passwordHash } = sha512("test", passwordSeed);

    promises.push(
      createTableRecord(db, "users", {
        id: faker.random.uuid(),
        email: email,
        username: username,
        password_seed: passwordSeed,
        password_hash: passwordHash,
        disabled: 0,
        frozen: 0,
        delisted: 0
      })
    );
  }

  return Promise.all(promises);
};

module.exports = () => {
  console.log("Creating seed.");

  return getDatabase().then(db =>
    Promise.all([createUsers(db), createArticles(db)])
  );
};
