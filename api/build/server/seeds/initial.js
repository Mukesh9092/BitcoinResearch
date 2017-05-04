

const _promise = require('babel-runtime/core-js/promise');

const _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const log = require('loglevel');
const faker = require('faker');

exports.seed = function (knex) {
  function deleteTables() {
    log.info('Deleting existing data.');

    return _promise2.default.resolve().then(() => {
      return knex('articles').del();
    }).then(() => {
      return knex('comments').del();
    }).then(() => {
      return knex('tags').del();
    }).then(() => {
      return knex('articles_tags').del();
    }).then(() => {
      return knex('users').del();
    });
  }

  function createUsers() {
    log.info('Creating users.');

    const promises = [];
    for (let i = 0, l = 20; i < l; i += 1) {
      promises.push(knex('users').insert({
        id: i,
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      }));
    }

    return _promise2.default.all(promises);
  }

  function createTags() {
    log.info('Creating tags.');

    const promises = [];
    for (let i = 0, l = 20; i < l; i += 1) {
      promises.push(knex('tags').insert({
        id: i,
        label: faker.lorem.word(),
      }));
    }

    return _promise2.default.all(promises);
  }

  function createArticles() {
    log.info('Creating articles.');

    const promises = [];
    for (let i = 0, l = 20; i < l; i += 1) {
      const title = faker.lorem.words();
      const slug = faker.helpers.slugify(title);
      const userId = Math.floor(Math.random() * 20) - 1 + 1;

      promises.push(knex('articles').insert({
        id: i,
        title,
        slug,
        body: faker.lorem.paragraphs(10),
        created: new Date(),
        updated: new Date(),
        userId,
      }));
    }

    return _promise2.default.all(promises);
  }

  function createComments() {
    log.info('Creating comments.');

    const promises = [];
    for (let i = 0, l = 20; i < l; i += 1) {
      const articleId = Math.floor(Math.random() * 20) - 1 + 1;
      const userId = Math.floor(Math.random() * 20) - 1 + 1;

      promises.push(knex('comments').insert({
        id: i,
        body: faker.lorem.paragraphs(3),
        created: new Date(),
        updated: new Date(),
        userId,
        articleId,
      }));
    }

    return _promise2.default.all(promises);
  }

  function tagArticles() {
    log.info('Tagging articles.');

    const promises = [];
    for (let i = 0, l = 100; i < l; i += 1) {
      promises.push(knex('articles_tags').insert({
        articleId: Math.floor(Math.random() * 20) - 1 + 1,
        tagId: Math.floor(Math.random() * 20) - 1 + 1,
      }));
    }

    return _promise2.default.all(promises);
  }

  return _promise2.default.resolve().then(deleteTables).then(createUsers).then(createTags).then(createArticles).then(createComments).then(tagArticles);
};
