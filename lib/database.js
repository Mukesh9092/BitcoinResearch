const path = require('path')

const faker = require('faker')
const rethinkdb = require('rethinkdb')

const { genRandomString, sha512 } = require('./crypto')

const {
  RETHINKDB_HOST,
  RETHINKDB_PORT,
  RETHINKDB_DB,
} = process.env

let db = null
const getDatabase = () => {
  if (db) {
    console.log('getDatabase existing db', db)

    return Promise.resolve(db)
  }

  return rethinkdb
    .connect({
      host: RETHINKDB_HOST,
      port: RETHINKDB_PORT,
    })
    .then((_db) => {
      db = _db

      console.log('getDatabase new db', db)

      return db
    })
}

const tables = [
  'users',
  'articles',
  'currencies',
]

const toArray = x => x.toArray()
const firstElement = ([x]) => x

const query = (table, fn) => {
  console.log('query', table, fn)

  return getDatabase()
    .then((db) => {
      console.log('query db', table, fn, db)

      const output = fn(rethinkdb.table(table))
        .run(db)

      console.log('query output', table, fn, output)

      return output
    })
}

const createGetByIdMethod = table => {
  return (id) => {
    return query(table, (cursor) => {
      return cursor.get(id)
    })
  }
}

const createGetByMethod = (table, key) => {
  return (value) => {
    console.log('createGetByMethod', table, key, value)

    return query(table, (cursor) => {
      console.log('createGetByMethod query', table, key, value, cursor)

      const output = cursor
        .filter({
          [key]: value
        })

      console.log('createGetByMethod cursor', table, key, value, cursor, output)

      return output
    })
      .then((result) => {
        console.log('createGetByMethod result', table, key, value, result)

        return result
      })
      .then(toArray)
      .then(firstElement)
  }
}

const createUpsertMethod = table => {
  return (records) => {
    return query(table, (cursor) => {
      return cursor.insert(records, {
        conflict: 'update',
      })
    })
  }
}

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
  console.log('Creating table record', table, record)

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
    id: faker.random.uuid(),
    email: email,
    username: username,
    password_seed: passwordSeed,
    password_hash: passwordHash,
    disabled: 0,
    frozen: 0,
    delisted: 0,
  }))

  for (let i = 2, l = 20; i < l; i++) {
    const email = faker.internet.email()
    const username = faker.internet.userName()
    const passwordSeed = genRandomString(64)
    const { passwordHash } = sha512('test', passwordSeed)

    promises.push(createTableRecord(db, 'users', {
      id: faker.random.uuid(),
      email: email,
      username: username,
      password_seed: passwordSeed,
      password_hash: passwordHash,
      disabled: 0,
      frozen: 0,
      delisted: 0,
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

    promises.push(createTableRecord(db, 'articles', {
      id: faker.random.uuid(),
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

const createTables = () => {
  console.log(`Creating tables: ${tables.join(', ')}.`)

  return getDatabase()
    .then((db) => Promise.all(tables.map((table) => {
      return createTable(db, table)
    })))
}

const destroyTables = () => {
  return getDatabase()
    .then((db) => {
      return rethinkdb
        .tableList()
        .run(db)
        .then((dbTables) => {
          console.log(`Destroying tables: ${dbTables.join(', ')}.`)

          return Promise.all(dbTables.map((table) => {
            return destroyTable(db, table)
          }))
        })
    })
}

const createSeed = () => {
  console.log('Creating seed.')

  return getDatabase()
    .then((db) => Promise.all([
      createUsers(db),
      createArticles(db),
    ]))
}

module.exports = {
  createGetByIdMethod,
  createGetByMethod,
  createUpsertMethod,
  createArticles,
  createSeed,
  createTables,
  createUsers,
  destroyTables,
  firstElement,
  getDatabase,
  query,
  toArray,
}
