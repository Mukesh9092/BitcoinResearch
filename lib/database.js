const path = require('path')

const faker = require('faker')
const rethinkdb = require('rethinkdb')

const { genRandomString, sha512 } = require('./crypto')

const {
  RETHINKDB_HOST,
  RETHINKDB_PORT,
  RETHINKDB_DB,
} = process.env

const tables = [ 'users', 'articles' ]

const createTable = (db, table) => {
  console.log(`Creating table '${table}'.`)

  return rethinkdb
    .tableCreate(table)
    .run(db)
}

const destroyTable = (db, table) => {
  console.log(`Destroying table '${table}'.`)

  return rethinkdb
    .tableDrop(table)
    .run(db)
}

const createTableRecord = (db, table, record) => {
  return rethinkdb
    .table(table)
    .insert(record)
    .run(db)
}

const createUsers = (db) => {
  console.log('Creating users.')

  const promises = []

  const email = 'admin@test.com'
  const username = 'admin'
  const passwordSeed = genRandomString(64)
  const { passwordHash } = sha512('test', passwordSeed)

  promises.push(createTableRecord(db, 'users', {
    id: 1,
    email: email,
    username: username,
    password_seed: passwordSeed,
    password_hash: passwordHash,
  }))

  for (let i = 2, l = 20; i < l; i++) {
    const email = faker.internet.email()
    const username = faker.internet.userName()
    const passwordSeed = genRandomString(64)
    const { passwordHash } = sha512('test', passwordSeed)

    promises.push(createTableRecord(db, 'users', {
      id: i,
      email: email,
      username: username,
      password_seed: passwordSeed,
      password_hash: passwordHash,
    }))
  }

  return Promise.all(promises)
}

const createArticles = (db) => {
  console.log('Creating articles.')

  const promises = []

  for (let i = 0, l = 20; i < l; i++) {
    const title = faker.lorem.words()
    const slug = faker.helpers.slugify(title)

    promises.push(createTableRecord(db, 'users', {
      id: i,
      title: title,
      slug: slug,
      body: faker.lorem.paragraphs(10),
      created: new Date(),
      updated: new Date(),
      userId: Math.floor(Math.random() * 20),
    }))
  }

  return Promise.all(promises)
}

let db = null
exports.getDatabase = () => {
  if (db) {
    return Promise.resolve(db)
  }

  return rethinkdb
    .connect({
      host: RETHINKDB_HOST,
      port: RETHINKDB_PORT,
    })
    .then((_db) => {
      db = _db
      return db
    })
}

exports.createTables = () => {
  console.log(`Creating tables: ${tables.join(', ')}.`)

  return getDatabase()
    .then((db) => Promise.all(tables.map(createTable(db))))
}

exports.destroyTables = () => {
  return getDatabase()
    .then((db) => {
      rethinkdb
        .tableList()
        .run(db)
        .then((dbTables) => {
          console.log(`Destroying tables: ${dbTables.join(', ')}.`)

          return Promise.all(dbTables.map(destroyTable(db)))
        })
    })
}

exports.createSeed = () => {
  console.log('Creating seed.')

  return getDatabase()
    .then((db) => Promise.all([
      createUsers(db),
      createArticles(db),
    ]))
}