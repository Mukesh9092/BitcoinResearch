const rethinkdb = require('rethinkdb')

const { getDatabase } = require('../../lib/database')
const { genRandomString, sha512 } = require('../../lib/authentication')

const toArray = x => x.toArray()
const firstElement = ([x]) => x

function toJSON(_user) {
  const user = Object.assign({}, _user)

  delete user.password_hash
  delete user.password_seed

  return JSON.stringify(user)
}

function getUsers() {
  console.log('lib/models/user getUsers')

  return getDatabase()
    .then((db) => {
      return rethinkdb
        .table('users')
        .run(db)
        .then(toArray)
    })
}

function getUserById(id) {
  console.log('lib/models/user getUserById', id)

  return getDatabase()
    .then((db) => {
      return rethinkdb
        .table('users')
        .get(id)
        .run(db)
        .then(firstElement)
    })
}

function getUserByEmail(email) {
  console.log('lib/models/user getUserByEmail', email)

  return getDatabase()
    .then((db) => {
      return rethinkdb
        .table('users')
        .filter({ email })
        .run(db)
        .then(toArray)
        .then(firstElement)
    })
}

function getUserByEmailPassword(email, password) {
  console.log('lib/models/user getUserByEmailPassword', email, password)

  return getUserByEmail(email)
    .then((user) => {
      const { passwordHash } = sha512(password, user.password_seed)

      if (user.password_hash !== passwordHash) {
        throw new Error('Incorrect password')
      }

      console.log('lib/models/user getUserByEmailPassword user', user)

      return user
    })
}

function createUserByEmailPassword(email, password) {
  console.log('lib/models/user createUserByEmailPassword', email, password)

  return getDatabase()
    .then((db) => {
      const passwordSeed = genRandomString(64)
      const { passwordHash } = sha512(password, passwordSeed)

      return rethinkdb
        .table('users')
        .insert({
          email,
          password_seed: passwordSeed,
          password_hash: passwordHash,
        })
        .then(toArray)
        .then(firstElement)
    })
}

function getOrCreateUserByEmailPassword(email, password) {
  console.log('lib/models/user getOrCreateUserByEmailPassword', email, password)

  return getUserByEmailPassword(email, password)
    .then((user) => {
      console.log('lib/models/user getOrCreateUserByEmailPassword user', user)

      if (user) {
        return user
      }

      return createUserByEmailPassword(email, password)
    })
}

module.exports = {
  toJSON,
  getUsers,
  getUserById,
  getUserByEmail,
  getUserByEmailPassword,
  createUserByEmailPassword,
  getOrCreateUserByEmailPassword,
}
