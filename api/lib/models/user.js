const rethinkdb = require('rethinkdb')

const { getDatabase } = require('../../lib/database')
const { genRandomString, sha512 } = require('../../lib/authentication')

const toArray = x => x.toArray()
const firstElement = ([x]) => x

exports.getUsers = () => {
  console.log('getUsers')

  return getDatabase()
    .then((db) => {
      return rethinkdb
        .table('users')
        .run(db)
        .then(toArray)
    })
}

exports.getUserById = (id) => {
  console.log('getUserById', id)

  return getDatabase()
    .then((db) => {
      return rethinkdb
        .table('users')
        .get(id)
        .run(db)
        .then(firstElement)
    })
}

exports.getUserByEmail = (email) => {
  console.log('getUserByEmail', email)

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

exports.getUserByEmailPassword = (email, password) => {
  console.log('getUserByEmailPassword', email, password)

  return exports.getUserByEmail(email)
    .then((user) => {
      const { passwordHash } = sha512(password, user.password_seed)

      if (user.password_hash === passwordHash) {
        return user
      } else {
        throw new Error('Incorrect password')
      }
    })
}

exports.createUserWithEmailPassword = (email, password) => {
  console.log('createUserWithEmailPassword', email, password)

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

exports.getOrCreateUserByEmailPassword = (email, password) => {
  console.log('getOrCreateUserByEmailPassword', email, password)

  return exports.getUserByEmailPassword(email, password)
    .then((user) => user || createUserWithEmailPassword(email, password))
}
