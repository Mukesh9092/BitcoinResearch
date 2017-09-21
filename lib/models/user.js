const rethinkdb = require("rethinkdb");

const {
  getDatabase,
  query,
  createGetByIdMethod,
  createGetByMethod,
  createUpsertMethod,
} = require('../database')
const { genRandomString, sha512 } = require("../crypto");

const filterRecords = cursor => {
  return cursor.filter({
    disabled: 0,
    frozen: 0,
    delisted: 0,
  })
}

const sanitizeRecord = (record) => {
  // console.log('sanitizeRecord', record)

  delete record.disabled
  delete record.frozen
  delete record.delisted
  delete record.password_hash;
  delete record.password_seed;

  return record
}

const sanitizeRecords = records => {
  return records.map(sanitizeRecord)
}

const getUsers = () => {
  return query('users', filterRecords)
    .then(x => x.toArray())
    .then(sanitizeRecords)
}

const getById = createGetByIdMethod('users')

const getUserById = id => {
  return getById(id)
    .then(sanitizeRecord)
}

const getByEmail = createGetByMethod('users', 'email')

const getUserByEmail = (email) => {
  // console.log("getUserByEmail", email)

  return getByEmail(email)
    .then((result) => {
      // console.log("getUserByEmail result", result)
      return result
    })
    .then(sanitizeRecord)
}

const getUserByEmailPassword = (email, password) => {
  // console.log("getUserByEmailPassword", email, password)

  return getByEmail(email)
    .then((user) => {
      // console.log("getUserByEmailPassword user", user)

      if (!user) {
        throw new Error("Incorrect email or password");
      }

      const { passwordHash } = sha512(password, user.password_seed);

      if (user.password_hash !== passwordHash) {
        throw new Error("Incorrect email or password");
      }

      return user;
    })
}

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  getUserByEmailPassword,
};
